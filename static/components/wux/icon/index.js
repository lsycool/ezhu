Component({
    externalClasses: ['wux-class'],
    properties: {
        type: {
            type: String,
            value: '',
        },
        title: {
            type: String,
            value: '',
        },
        addon: {
            type: String,
            value: '',
        },
        size: {
            type: Number,
            value: 32,
        },
        color: {
            type: String,
            value: '',
        },
		disable: {
            type: Boolean,
            value: false
        }
    },
})