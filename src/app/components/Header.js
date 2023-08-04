const Header = (props) => {

    return (
        <header className="header">
            <div className="header__logo">
                Where in the world?
            </div>
            <div className="header__darkmode" onClick={props.darkModeEvent}>
                Dark Mode
            </div>
        </header>
    )
}

export default Header;