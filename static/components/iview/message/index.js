const default_data = {
    visible: false,
    content: '',
    duration: 2,
    type: 'default', // default || success || warning || error
};

Component({
    externalClasses: ['i-class'],
    properties : {
        content : {
            type : String,
            value : '300'
        },
        type : {
            type : String,
            value : 'default'
        },
        duration : {
            type : Number,
            value : 2
        },
        visible : {
            type : Boolean,
            value : false
        },
    }
});