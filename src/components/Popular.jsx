import { useEffect, useState } from "react";
import axios from "axios";
import { styled } from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { Link } from "react-router-dom";

const Popular = () => {
	const [popular, setPopular] = useState([]);

	useEffect(() => {
		getPopular();
	}, []);

	const getPopular = async () => {
		const check = localStorage.getItem("popular");

		if (check) {
			setPopular(JSON.parse(check));
		} else {
			const APIKEY = import.meta.env.VITE_API_KEY;
			const api = await axios.get(
				`https://api.spoonacular.com/recipes/random?apiKey=${APIKEY}&number=7`
			);

			localStorage.setItem("popular", JSON.stringify(api.data.recipes));
			setPopular(api.data.recipes);
		}
	};

	return (
		<Wrapper>
			<h3>Popular Picks</h3>
			<Splide
				options={{
					perPage: 4,
					arrows: false,
					pagination: false,
					drag: "free",
					gap: "5rem",
				}}
			>
				{popular.map((recipe) => {
					return (
						<SplideSlide key={recipe.id}>
							<Card key={recipe.id}>
								<Link to={"/recipe/" + recipe.id}>
									<p>{recipe.title}</p>
									{recipe.image ? (
										<img
											src={recipe.image}
											alt={recipe.title}
										/>
									) : null}
									<Gradient />
								</Link>
							</Card>
						</SplideSlide>
					);
				})}
			</Splide>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	margin: 4rem 0rem;
`;

const Card = styled.div`
	min-height: 15rem;
	border-radius: 2rem;
	overflow: hidden;
	position: relative;

	img {
		border-radius: 2rem;
		position: absolute;
		left: 0;
		height: 100%;
		width: 100%;
		object-fit: cover;
	}

	p {
		position: absolute;
		z-index: 10;
		left: 50%;
		bottom: 0;

		transform: translate(-50%, 0%);
		color: white;
		width: 100%;
		text-align: center;
		font-weight: 600;
		font-size: 1rem;
		height: 40%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
`;

const Gradient = styled.div`
	z-index: 3;
	position: absolute;
	width: 100%;
	height: 100%;
	background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));
`;

export default Popular;
