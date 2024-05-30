// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "leblanc" is now active!');

	let leblanc_have_mark = false;
	let mark_editor: vscode.TextEditor;
	let mark_range: vscode.Range;
	let mark_position: vscode.Position;
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let leblanc = vscode.commands.registerCommand('leblanc.distortion', () => {
		// The code you place here will be executed every time your command is executed
		if (leblanc_have_mark) {
			// vscode.window.showInformationMessage(`go back to mark ${mark_position.line + 1}, ${mark_position.character + 1}`);
			const line_count = mark_editor.document.lineCount;
			if (mark_position.line + 1 > line_count) {
				leblanc_have_mark = false;
				vscode.window.showInformationMessage('leblanc: error line');
				return;
			}
			
			const line_text = mark_editor.document.lineAt(mark_position.line).text;
			const mark_line_max_char = line_text.length;
			if (mark_position.character > mark_line_max_char) {
				leblanc_have_mark = false;
				vscode.window.showInformationMessage('leblanc: error position');
				return;
			}
			
			const mark_selection = new vscode.Selection(mark_position, mark_position);
			mark_editor.selection = mark_selection;
			mark_editor.revealRange(mark_range);
			leblanc_have_mark = false;
		} else {
			// set mark
			const editor = vscode.window.activeTextEditor;
			if (editor == undefined || editor == null) {
				return;
			}

			mark_editor = editor;
			mark_range = mark_editor.visibleRanges[0];
			mark_position = mark_editor.selection.active;
			leblanc_have_mark = true;
		}
	});

	context.subscriptions.push(leblanc);
}

// This method is called when your extension is deactivated
export function deactivate() {}
