import React from "react";
import { SideBar, MainMenu } from "./Sidebar.style";
import MenuItem from "./MenuItem.component";
import SidebarDownloadInput from "./SidebarDownloadInput.component";

const Sidebar = () => {
    return (<SideBar id="SideBar">

        <MainMenu>
            <MenuItem route="/movie" icon="movie" title="Movies" />
            <MenuItem route="/video" icon="video" title="Videos" />
            <MenuItem route="/music" icon="music" title="Music" />
            <MenuItem route="/file" icon="file" title="Files" />
            <MenuItem route="/browse" icon="folder" title="Browse" />
        </MainMenu>

        <SidebarDownloadInput/>

    </SideBar>)
}

export default Sidebar;