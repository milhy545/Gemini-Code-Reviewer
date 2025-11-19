// Prevents additional console window on Windows in release
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::{
    AppHandle, CustomMenuItem, Manager, SystemTray, SystemTrayEvent, SystemTrayMenu,
    SystemTrayMenuItem, WindowEvent, GlobalShortcutManager,
};

// Commands callable from frontend
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! Welcome to Gemini Code Reviewer!", name)
}

#[tauri::command]
fn open_file_dialog(app_handle: AppHandle) -> Result<String, String> {
    // Open file dialog
    use tauri::api::dialog::blocking::FileDialogBuilder;

    match FileDialogBuilder::new()
        .add_filter("Code Files", &["js", "ts", "py", "java", "go", "rs"])
        .pick_file()
    {
        Some(path) => Ok(path.to_string_lossy().to_string()),
        None => Err("No file selected".to_string()),
    }
}

#[tauri::command]
fn read_file(path: String) -> Result<String, String> {
    std::fs::read_to_string(&path)
        .map_err(|e| format!("Failed to read file: {}", e))
}

fn create_system_tray() -> SystemTray {
    let quit = CustomMenuItem::new("quit".to_string(), "Quit");
    let show = CustomMenuItem::new("show".to_string(), "Show Window");
    let hide = CustomMenuItem::new("hide".to_string(), "Hide Window");
    let review = CustomMenuItem::new("review".to_string(), "Quick Review");

    let tray_menu = SystemTrayMenu::new()
        .add_item(show)
        .add_item(hide)
        .add_native_item(SystemTrayMenuItem::Separator)
        .add_item(review)
        .add_native_item(SystemTrayMenuItem::Separator)
        .add_item(quit);

    SystemTray::new().with_menu(tray_menu)
}

fn handle_system_tray_event(app: &AppHandle, event: SystemTrayEvent) {
    match event {
        SystemTrayEvent::LeftClick { .. } => {
            let window = app.get_window("main").unwrap();
            window.show().unwrap();
            window.set_focus().unwrap();
        }
        SystemTrayEvent::MenuItemClick { id, .. } => match id.as_str() {
            "quit" => {
                std::process::exit(0);
            }
            "show" => {
                let window = app.get_window("main").unwrap();
                window.show().unwrap();
                window.set_focus().unwrap();
            }
            "hide" => {
                let window = app.get_window("main").unwrap();
                window.hide().unwrap();
            }
            "review" => {
                let window = app.get_window("main").unwrap();
                window.show().unwrap();
                window.set_focus().unwrap();
                // Trigger quick review via event
                window.emit("quick-review", ()).unwrap();
            }
            _ => {}
        },
        _ => {}
    }
}

fn main() {
    tauri::Builder::default()
        .system_tray(create_system_tray())
        .on_system_tray_event(handle_system_tray_event)
        .on_window_event(|event| match event.event() {
            WindowEvent::CloseRequested { api, .. } => {
                // Hide instead of close
                event.window().hide().unwrap();
                api.prevent_close();
            }
            _ => {}
        })
        .setup(|app| {
            // Register global shortcut: Ctrl+Alt+G
            let mut shortcut_manager = app.global_shortcut_manager();
            let window = app.get_window("main").unwrap();

            shortcut_manager
                .register("CmdOrCtrl+Alt+G", move || {
                    window.show().unwrap();
                    window.set_focus().unwrap();
                })
                .unwrap();

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![greet, open_file_dialog, read_file])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
