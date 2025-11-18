// Utility for handling large code files by chunking them

export interface CodeChunk {
  index: number;
  content: string;
  startLine: number;
  endLine: number;
  totalChunks: number;
}

export const chunkingUtils = {
  // Maximum lines per chunk (to stay within API limits)
  MAX_LINES_PER_CHUNK: 500,

  // Maximum characters per chunk
  MAX_CHARS_PER_CHUNK: 15000,

  // Check if code needs chunking
  needsChunking(code: string): boolean {
    const lines = code.split('\n');
    return lines.length > this.MAX_LINES_PER_CHUNK || code.length > this.MAX_CHARS_PER_CHUNK;
  },

  // Split code into chunks
  chunkCode(code: string): CodeChunk[] {
    const lines = code.split('\n');
    const chunks: CodeChunk[] = [];

    if (!this.needsChunking(code)) {
      return [{
        index: 0,
        content: code,
        startLine: 1,
        endLine: lines.length,
        totalChunks: 1,
      }];
    }

    let currentChunk: string[] = [];
    let currentChunkChars = 0;
    let chunkStartLine = 1;
    let chunkIndex = 0;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const lineLength = line.length + 1; // +1 for newline

      // Check if adding this line would exceed limits
      if (
        currentChunk.length >= this.MAX_LINES_PER_CHUNK ||
        currentChunkChars + lineLength > this.MAX_CHARS_PER_CHUNK
      ) {
        // Save current chunk
        if (currentChunk.length > 0) {
          chunks.push({
            index: chunkIndex,
            content: currentChunk.join('\n'),
            startLine: chunkStartLine,
            endLine: chunkStartLine + currentChunk.length - 1,
            totalChunks: 0, // Will update later
          });

          chunkIndex++;
          currentChunk = [];
          currentChunkChars = 0;
          chunkStartLine = i + 1;
        }
      }

      currentChunk.push(line);
      currentChunkChars += lineLength;
    }

    // Add last chunk
    if (currentChunk.length > 0) {
      chunks.push({
        index: chunkIndex,
        content: currentChunk.join('\n'),
        startLine: chunkStartLine,
        endLine: chunkStartLine + currentChunk.length - 1,
        totalChunks: 0,
      });
    }

    // Update totalChunks for all chunks
    const totalChunks = chunks.length;
    chunks.forEach(chunk => {
      chunk.totalChunks = totalChunks;
    });

    return chunks;
  },

  // Merge chunk results back together
  mergeChunkResults(results: string[]): string {
    return results.map((result, index) => {
      return `### Část ${index + 1}/${results.length}\n\n${result}`;
    }).join('\n\n---\n\n');
  },

  // Get chunk info string
  getChunkInfo(chunk: CodeChunk): string {
    return `Část ${chunk.index + 1}/${chunk.totalChunks} (řádky ${chunk.startLine}-${chunk.endLine})`;
  },

  // Estimate processing time for chunks
  estimateProcessingTime(numChunks: number): number {
    // Estimate ~5 seconds per chunk (API call + processing)
    return numChunks * 5;
  },
};
