interface CommonInput {
	id?: string;
	key?: string;
}

interface InputConfig extends CommonInput {
	type: "input";
	inputType: string;
	label: string;
}

interface DetailsConfig extends CommonInput {
	type: "details";
	details: string;
}

type AnyInputConfig = InputConfig | DetailsConfig;

interface AskConfig {
	id: string;
	inputs: AnyInputConfig[];
}

interface AskOptions {
	/**
	 * When an already existing ask dialog with the same ID is open, should
	 * the manager return a promise that will resolve when it's confirmed,
	 * or return an indicator that it's been fronted and let processing
	 * continue (this is used primarily to prevent multiple macro
	 * executions at the same time once a dialog is confirmed)
	 */
	onlyOneWaiting?: boolean;
}

interface AskResult {
	/**
	 * The state that the dialog resulted in. A state of prompted + answers
	 * mean that the user confirmed the inputs and closed the dialog. A
	 * state of `prompted` but no answers provided means that the dialog was
	 * closed without the user confirming their inputs. A a state of
	 * `fronted` indicates that the dialog with the provided ID is already
	 * open and it was focused for the user. A state of `errored` indicates
	 * an error that should needs to be addressed.
	 */
	state: "prompted" | "fronted" | "errored";

	/** The answer(s) that the user provided */
	answers?: Record<string, unknown> | unknown;

	/** The error message when the state is errored */
	error?: string;
}
