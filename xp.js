const dragElements = document.querySelectorAll(".topBar"); 

const resizeElements = document.querySelectorAll(".resizeMarker");

const urlBars = document.querySelectorAll("input[type='url']")

dragElements.forEach((element) => {
    element.addEventListener("mousedown", (e) => {
        const parent = element.parentNode;
        const onMove = (event) => onMouseDrag(event, parent); 

        document.addEventListener("mousemove", onMove);
        document.addEventListener("mouseup", () => {
            document.removeEventListener("mousemove", onMove);
        }, { once: true });
    });
});

resizeElements.forEach((element) => {
    element.addEventListener("mousedown", (e) => {
        const parent = element.parentNode;
        const onMove = (event) => windowResize(event, parent); 

        document.addEventListener("mousemove", onMove);
        document.addEventListener("mouseup", () => {
            document.removeEventListener("mousemove", onMove);
        }, { once: true });
    });
});

urlBars.forEach((element) => {
    element.addEventListener("change", (e) => {
        document.addEventListener("change", changePage(element));
        document.removeEventListener("change", changePage(element));
    })
})

function onMouseDrag(event, element) {
    let leftValue = parseInt(window.getComputedStyle(element).left);
    let topValue = parseInt(window.getComputedStyle(element).top);

    element.style.left = `${leftValue + event.movementX}px`;
    element.style.top = `${topValue + event.movementY}px`;
}

function windowResize(event, element) {
    let widthOG = parseInt(window.getComputedStyle(element).width);
    let heightOG = parseInt(window.getComputedStyle(element).height);

    element.style.width = `${widthOG + event.movementX}px`;
    element.style.height = `${heightOG + event.movementY}px`;

    console.log("width", widthOG + event.movementX, "  height", heightOG + event.movementY)
}

function changePage(element) {
    const iframe = element.parentNode.querySelector(".windowCont");

    iframe.src = element.value;
}