export function filePath(path) {
	if (path.startsWith(`/`)) {
		path = path.slice(1);
	};
	return `modules/dialog-manager/${path}`
};
