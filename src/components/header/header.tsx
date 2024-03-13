import './header.scss'


export default function Header() {
    return (
        <header>
            <nav className="navigation">
                <h2 className="navigation__heading">Какая погода сегодня?</h2>
                <div className="nav">
                    <a href="https://www.youtube.com/watch?v=EaqJgQOVZ9k" className="navigation__link">
                        <p className="navigation__link__description">Ответ на смысл жизни</p>
                    </a>
                    <a href="https://github.com/VolffS" className="navigation__link">
                        <img src="/github.svg" alt="" className="navigation__link__img"/>
                        <p className="navigation__link__description">Github</p>
                    </a>
                </div>
            </nav>
        </header>
    );
}