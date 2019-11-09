class Input {
    constructor(){

    }

    InitKeyboard(){
        //Data Structure to store KeyCode maps
        this.KeyMap = {
            //KeyCode to Human readable
            KeyCode: {
                68: 'D',
                65: 'A',
                87: 'W',
                83: 'S'
            },
            //Human readable to KeyCode
            VirtualKey: {
                'D': 68,
                'A': 65,
                'W': 87,
                'S': 83
            }
        };

        this.Keyboard = [];

        //Bind keydown and keyup event listeners
        let keydownFunc = this.Keydown.bind(this);
        let keyupFunc = this.Keyup.bind(this);
        window.addEventListener("keydown", keydownFunc, false)
        window.addEventListener("keyup", keyupFunc, false)
    }

    //Event fired when a key is pressed
    Keydown(event) {
        let keyObj = this.Keyboard[event.keyCode];
        if(keyObj) keyObj.IsPressed = true;
    }

    //Event fired when a key is released
    Keyup(event) {
        let keyObj = this.Keyboard[event.keyCode];
        if(keyObj) keyObj.IsPressed = false;
    }

    //Add a key to listen to
    AddKey(key) {	
        let keyObj = new KeyObj(key);
        let keyCode = this.KeyMap.VirtualKey[key];	
        this.Keyboard[keyCode] = keyObj;
    }
}	