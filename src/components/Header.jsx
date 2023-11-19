import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {FaYoutube} from "react-icons/fa";
import {CiSearch} from "react-icons/ci";
import './header.css'

const Header = () => {
    const [text, setText] = useState("");
    const navigate = useNavigate();
    const ouSubmitBtn = (e) => {
        e.preventDefault();
        setText("");
        navigate(`/videos/${text}`);
    };
    const onChangeValue = (e) => {
        setText(e.target.value);
    };
    return (
        <header className="header">
            <Link className="header-link" to="/">
                <FaYoutube className="header-link__logo" />
                <h1>Youtube</h1>
            </Link>

            <form className="header-form" onSubmit={ouSubmitBtn}>
                <input
                    type="text"
                    value={text}
                    onChange={onChangeValue}
                    placeholder="검색"
                />
                <button>
                    <CiSearch className="header-form__icon" />
                </button>
            </form>
        </header>
    );
};

export default Header;