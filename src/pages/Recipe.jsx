import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { styled } from "styled-components";

function Recipe() {
	let params = useParams();

	const [details, setDetails] = useState({});
	const [active, setActive] = useState("summary");

	useEffect(() => {
		getDetails();
	}, [params.name]);

	const getDetails = async () => {
		const APIKEY = import.meta.env.VITE_API_KEY;
		const api = await axios.get(
			`https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${APIKEY}`
		);
		setDetails(api.data);
	};

	const removeLinks = (htmlText) => {
		return htmlText?.replace(/<a\s+href=\"([^\"]+)\">/g, "");
	};

	return (
		<Wrapper>
			<div>
				<h2>{details.title}</h2>
				<img src={details.image} alt={details.title} />
			</div>
			<Info>
				<Button
					className={active === "summary" ? "active" : ""}
					onClick={() => setActive("summary")}
				>
					Summary
				</Button>
				<Button
					className={active === "instructions" ? "active" : ""}
					onClick={() => setActive("instructions")}
				>
					Instructions
				</Button>
				<Button
					className={active === "ingredients" ? "active" : ""}
					onClick={() => setActive("ingredients")}
				>
					Ingredients
				</Button>
				{active === `summary` && (
					<div>
						<h3
							dangerouslySetInnerHTML={{
								__html: removeLinks(details.summary),
							}}
						></h3>
					</div>
				)}
				{active === `instructions` && (
					<div>
						<h3
							dangerouslySetInnerHTML={{
								__html: details.instructions,
							}}
						></h3>
					</div>
				)}
				{active === `ingredients` && (
					<ul>
						{details.extendedIngredients?.map((ingredient) => (
							<li key={ingredient.id}>{ingredient.original}</li>
						))}
					</ul>
				)}
			</Info>
		</Wrapper>
	);
}

const Wrapper = styled.div`
	margin-top: 10rem;
	margin-bottom: 5rem;
	display: flex;
	h2 {
		margin-bottom: 2rem;
	}
	li {
		font-size: 1.2rem;
		line-height: 2.5rem;
	}
	ul {
		margin-top: 2rem;
	}
	.active {
		background: linear-gradient(35deg, #494949, #313131);
		color: white;
	}
`;

const Button = styled.button`
	padding: 1rem 2rem;
	color: #313131;
	background: white;
	border: 2px solid black;
	margin-right: 2rem;
	font-weight: 600;
	cursor: pointer;
`;

const Info = styled.div`
	margin-left: 10rem;
`;

export default Recipe;
