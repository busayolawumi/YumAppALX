import React from "react";
import Home from "./pages/Home";
import Category from "./components/Category";
import Pages from "./pages/Pages";
import { BrowserRouter, Link } from "react-router-dom";
import Search from "./components/Search";
import { styled } from "styled-components";
import { GiKnifeFork } from "react-icons/gi";

const App = () => {
	return (
		<>
			<BrowserRouter>
				<Nav>
					<Logo to={"/"}>
						<GiKnifeFork />
						Yum App
					</Logo>
				</Nav>
				<Search />
				<Category />
				<Pages />
			</BrowserRouter>
		</>
	);
};

const Logo = styled(Link)`
	text-decoration: none;
	font-size: 1.5rem;
	font-weight: 400;
	font-family: "Lobster Two", cursive;
`;

const Nav = styled.div`
	padding: 4rem 0rem;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	svg {
		font-size: 2rem;
	}
`;

export default App;
