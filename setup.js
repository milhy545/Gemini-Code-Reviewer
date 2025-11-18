#!/usr/bin/env node

/**
 * Setup script for Gemini Code Reviewer
 * Checks for .env.local and optionally sets custom port
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const ENV_FILE = path.join(__dirname, '.env.local');

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function setup() {
  console.log('🤖 Gemini Code Reviewer - Setup\n');

  let envContent = '';
  let needsSetup = false;

  // Check if .env.local exists
  if (fs.existsSync(ENV_FILE)) {
    const existing = fs.readFileSync(ENV_FILE, 'utf-8');
    envContent = existing;
    console.log('✅ .env.local soubor nalezen\n');

    // Check if API_KEY is set
    if (!existing.includes('API_KEY=') || existing.match(/API_KEY=\s*$/m)) {
      console.log('⚠️  API_KEY není nastaven!\n');
      needsSetup = true;
    }
  } else {
    console.log('ℹ️  .env.local soubor neexistuje, vytváření...\n');
    needsSetup = true;
  }

  // Setup API Key if needed
  if (needsSetup) {
    const apiKey = await question('Zadejte Gemini API klíč (získat na https://ai.google.dev/): ');

    if (apiKey.trim()) {
      if (envContent.includes('API_KEY=')) {
        envContent = envContent.replace(/API_KEY=.*$/m, `API_KEY=${apiKey.trim()}`);
      } else {
        envContent += `\nAPI_KEY=${apiKey.trim()}`;
      }
    } else {
      console.log('\n⚠️  API klíč nebyl zadán. Můžete ho nastavit později v .env.local souboru.\n');
    }
  }

  // Ask about port
  console.log('\n📡 Konfigurace portu');
  console.log('Výchozí port: 5173 (můžete nechat prázdné)');
  const customPort = await question('Zadejte vlastní port (nebo Enter pro výchozí): ');

  if (customPort.trim()) {
    const portNum = parseInt(customPort.trim(), 10);
    if (!isNaN(portNum) && portNum > 0 && portNum < 65536) {
      if (envContent.includes('PORT=')) {
        envContent = envContent.replace(/PORT=.*$/m, `PORT=${portNum}`);
      } else {
        envContent += `\nPORT=${portNum}`;
      }
      console.log(`✅ Port nastaven na: ${portNum}`);
    } else {
      console.log('⚠️  Neplatný port, používám výchozí (5173)');
    }
  } else {
    console.log('✅ Používám výchozí port: 5173');
  }

  // Write .env.local file
  fs.writeFileSync(ENV_FILE, envContent.trim() + '\n');
  console.log('\n✅ Konfigurace uložena do .env.local\n');

  // Show next steps
  console.log('🚀 Spuštění aplikace:');
  console.log('   npm run dev\n');
  console.log('📝 Pro změnu nastavení upravte soubor .env.local\n');

  rl.close();
}

setup().catch(err => {
  console.error('❌ Chyba při setupu:', err);
  process.exit(1);
});
