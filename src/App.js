import { Formik, Form, Field } from "formik";
import { useState } from "react";
import "../src/styles/Header.css";
import "../src/styles/Content.css";
import "../src/styles/Article.css";

const App = () => {
	const [photos, setPhotos] = useState([]);
	const open = (url) => {
		window.open(url);
	};

	return (
		<div>
			<header>
				<Formik
					initialValues={{ search: "" }}
					onSubmit={async (values) => {
						const response = await fetch(
							`https://api.unsplash.com/search/photos?per_page=20&query=${values.search}`,
							{
								headers: {
									Authorization:
										"Client-ID dUIz-SX5-gwwzJ4GMLsjzCYX5nTH88rGHvruyP_C83U",
								},
							}
						);
						const data = await response.json();

						setPhotos(data.results);
					}}
				>
					<Form>
						<label>Busca imagenes:</label>
						<Field name="search" />
					</Form>
				</Formik>
			</header>
			<div className="container">
				<div className="center">
					{photos.map((photo) => {
						return (
							<article key={photo.id}>
								<img
									src={photo.urls.regular}
									alt="Fotos"
									onClick={() => open(photo.links.html)}
								/>
								<p>{[photo.description, photo.alt_description].join(" - ")}</p>
							</article>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default App;
