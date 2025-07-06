import { filePath } from "../consts.mjs";

const { HandlebarsApplicationMixin, ApplicationV2 } = foundry.applications.api;

export class AskDialog extends HandlebarsApplicationMixin(ApplicationV2) {
	static DEFAULT_OPTIONS = {
		tag: `dialog`,
		classes: [
			`application`,
			`dialog`,
			`dialog-manager`,
			`ask`,
		],
		position: {
			width: 330,
		},
		window: {
			title: `Questions`,
			resizable: true,
			minimizable: true,
			contentTag: `form`,
		},
		form: {
			closeOnSubmit: true,
			submitOnChange: false,
			handler: this.#submit,
		},
		actions: {
			cancel: this.#cancel
		}
	};

	static PARTS = {
		inputs: {
			template: filePath(`templates/ask/inputs.hbs`),
			templates: [
				filePath(`templates/ask/inputs/input.hbs`),
				filePath(`templates/ask/inputs/details.hbs`),
			]
		},
		controls: {
			template: filePath(`templates/ask/controls.hbs`),
		},
	};

	_inputs = [];

	/** @type {string | undefined} */
	_description = undefined;

	/** @type {Function | undefined} */
	_onConfirm;

	/** @type {Function | undefined} */
	_onCancel;

	/** @type {Function | undefined} */
	_onClose;

	constructor({
		inputs = [],
		description = undefined,
		onConfirm,
		onCancel,
		onClose,
		...options
	} = {}) {
		super(options);
		this._inputs = inputs;
		this._description = description;
		this._onCancel = onCancel;
		this._onConfirm = onConfirm;
		this._onClose = onClose;
	};

	// #region Lifecycle
	async _onFirstRender() {
		super._onFirstRender();
		this.element.show();
	};

	async _prepareContext() {
		return {
			inputs: this._inputs,
			description: this._description,
		};
	};

	async _onClose() {
		super._onClose();
		this._onClose?.();
	};
	// #endregion Lifecycle

	// #region Actions
	/** @this {AskDialog} */
	static async #submit(_event, _element, formData) {
		const answers = formData.object;
		const keys = Object.keys(answers);
		if (keys.length === 1) {
			this._onConfirm?.(answers[keys[0]]);
			return;
		};
		this._onConfirm?.(answers);
	};

	/** @this {AskDialog} */
	static async #cancel() {
		this._onCancel?.();
		this.close();
	};
	// #endregion Actions
};
