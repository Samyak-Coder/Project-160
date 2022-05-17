AFRAME.registerComponent("tuor", {

    shema: {
        state: {type: "string", default: "places-list"},
        selectedPlace: {type:"string", default: "#card1"},
        zoomAspectRatio: {type: "number", default: 1}
    },

    init: function(){
        this.placeContainer = this.el;
        this.cameraEl = document.querySelector("#camera");
        this.createPlace();
    },

    tick: function(){
        const {state} = this.el.getAttribute("tour");

        if(state === "view"){
            this.hideEl([this.placesContainer]);
            this.showView();
        }
    },
    
    hideEl: function(elList){
        elList.map(el => {
            el.setAttribute("visible", false);
        });
    },

    createPlace: function(){
        const details = {
            garden: {
                position: {x: 20, y: -4.5, z: -5.5},
                rotation: {x: 0, y: -90, z: 0},
                src: "./assets/thumbnails.garden.png",
                title: "Garden"
            },
            main_gate: {
                position: { x: 4.6, y: -5.5, z: 25 },
                rotation: { x: 180, y: 0, z: 0 },
                src: "./assets/thumbnails/main_gate.png",
                title: "Main Gate",
                id: "main_gate"
              },
              home: {
                position: { x: -9, y: 34, z: -100 },
                rotation: { x: 0, y: 0, z: 0 },
                src: "./assets/thumbnails/home.png",
                title: "My Home",
                id: "home"
              }
        }
        for(var key in details){
            const item = details[key];
            const thumbnail = this.createThumbNail(item);
            const title = this.createTitleEL(item);

            thumbnail.appendChild(title);
            this.placeContainer.appendChild(thumbnail);
        }
    },

    
    createTitleEL: function(item){
        const entityEl = document.createElement("a-entity");
        const id = `title-${item.id}`;
        entityEl.setAttribute("text", {
            font: "exo2bold",
            align: "center",
            color: "#e91e63",
            value: item.title
        });
        const position = {
            x: 0, 
            y: -4, 
            z: 0
        }
        
        entityEl.setAttribute("position", positin);

        if(item.title == "Main Gate"){
            entityEl.setAttribute("rotation", {x: 180, y: 180, z: 0});
            
            entityEl.setAttribute("rotation", {
                x: 0,
                y: 4, 
                z: 0
            });
        }
        entityEl.setAttribute("visible", ture);
        return entityEl;
    },

    showView: function(){
        const {selectedPlace} = this.data;
        const skyEl = document.querySelector("#main-container");
        skyEl.setAttribute("material", {
            src: `./assets/360_images/${selectedPlace}.jpg`,
            color: "#fff"
        });
    },

    update: function(){
    window.addEventListener("keyDown", e => {
    if(e.key === "ArrowUp"){
        if(this.data.zoomAspectRatio <= 10){
            this.data.zoomAspectRatio += 0.002;
            this.cameraEl.setAttribute("zoom", this.data.zoomAspectRatio); 
        }
    }

    })}

})