Just a simple server-client to serve mp3s, etc.

When basepath for library is set, every subdirectory is scanned for audio files and if it contains any, it's mapped as a list.
In client lists are shown in nav-list or tabs. The selected list gets rendered with all files.

Player implementation will probably change eventually, but for now HTML5 player will be used.
