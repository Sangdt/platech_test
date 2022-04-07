

const btn = document.querySelector('#nav-icon');
btn.addEventListener('click', (event) => {
    // event.preventDefault();
    // console.log(event.currentTarget);
    // console.log(document);
    const navButton = event.currentTarget;
    const Header = document.getElementById('PageHeader');
    // console.log("Header", document.getElementById('PageHeader'))
    const body = document.body;
    const bottomMenu = Header.getElementsByClassName("menu")[0];
    const TopMenu = Header.getElementsByClassName("top")[0];
    const sublistMenu = Header.getElementsByClassName("sub-list");
    const subMenu = Header.getElementsByClassName("sub");
    // console.log(" class ",navButton.classList.contains("open"))

    if (navButton.classList.contains("open")) {
        navButton.classList.remove("open")
        body.classList.remove("modal-open")
        Header.classList.remove("modal-open")
        bottomMenu.classList.remove("open")
        TopMenu.classList.remove("open")
        if (sublistMenu && sublistMenu.length > 0) {
            for (const submenu of sublistMenu) {
                submenu.classList.remove("open");
            }
        }
        if (subMenu && subMenu.length > 0) {
            for (const menu of subMenu) {
                menu.classList.remove("open");
            }
        }
    } else {
        body.classList.add("modal-open");
        navButton.classList.add("open")
        Header.classList.add("open");
        bottomMenu.classList.add("open")
        TopMenu.classList.add("open")
        // sublistMenu.classList.add("open")
        // subMenu.classList.add("open")
    }
});