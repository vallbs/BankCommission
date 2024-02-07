# ADR: Chunked File Reading Strategy
## Context
In our application, we need to load data from files specified as arguments in the node run command. However, some of these files can be quite large, (for example 1GB+ in size). Reading such large files all at once could block the application and lead to poor performance.

## Decision
It was decided to implement a chunked file reading strategy to address the potential performance issues caused by reading large files. Instead of loading the entire file into memory at once, we will read the file in smaller, manageable chunks.

## Rationale
**Performance**: Reading large files in chunks prevents the application from being blocked while waiting for the entire file to be loaded into memory. This can lead to better overall performance, especially when dealing with very large files.

**Memory Management**: Reading files in chunks helps to conserve memory by only loading a portion of the file into memory at any given time. This is crucial when dealing with files that are too large to fit entirely into memory.

**Robustness**: Chunked file reading provides a more robust solution for handling large files, reducing the risk of crashes or memory-related issues that can occur when attempting to load entire files into memory.

## Consequences
**Complexity**: Implementing a chunked file reading strategy adds some complexity to the codebase compared to simply reading the entire file at once. However, the benefits in terms of performance and memory management outweigh this added complexity.

## Alternatives Considered
**Reading Entire File Into Memory**: This alternative was considered but rejected due to the potential performance issues and memory constraints associated with reading very large files into memory all at once.

## Implementation Plan
Implement a function to read files in chunks, specifying the chunk size.

## Performance Results
As a result, a file with **1GB of data** is processed asynchronously, and the total processing time for approximately **8.4 million operations** is about **44 seconds**.