import React, { Component } from "react";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Collapse } from "react-bootstrap";

class Articles extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			newTitle: "",
			newBody: "",
			articles: [],
			companyName: this.props.companyName,
			toggle: false,
		};
		this.updateArticle = this.updateArticle.bind(this);
		this.handleTitleChange = this.handleTitleChange.bind(this);
		this.handleBodyChange = this.handleBodyChange.bind(this);
		this.fetchArticle = this.fetchArticle.bind(this);
	}

	handleTitleChange(event) {
		this.setState({
			newTitle: event.target.value,
		});
	}

	handleBodyChange(event) {
		this.setState({
			newBody: event.target.value,
		});
	}

	toggleFunc() {
		this.setState({
			toggle: !this.state.toggle,
		});
	}

	fetchArticle() {
		const requestOptions = {
			method: "POST",
			headers: { "Content-type": "application/json" },
			body: JSON.stringify({
				company: this.props.companyName,
				email: this.props.userEmail,
				token: this.props.userToken,
			}),
		};

		fetch(
			"http://45.33.126.222:1944/api/companies/get/" +
				this.state.companyName,
			requestOptions
		) //TODO: I forget if I need this part or not
			.then((res) => res.json())
			.then((res) =>
				this.setState({
					articles: res.articles,
				})
			);
	}

	updateArticle(event) {
		event.preventDefault();
		const requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				company: this.props.companyName,
				title: this.state.newTitle,
				content: this.state.newBody,
			}),
		};

		fetch(
			"http://45.33.126.222:1944/api/companies/articles/" +
				this.props.companyName,
			requestOptions
		).then((res) => res.json());

		this.setState({
			articles: [
				...this.state.articles,
				{ title: this.state.newTitle, content: this.state.newBody },
			],
			newTitle: "",
			newBody: "",
		});
	}

	componentDidMount() {
		this.fetchArticle();
	}

	componentWillReceiveProps(nextProps) {
		this.setState({ companyName: nextProps.companyName });
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.state.companyName !== prevState.companyName) {
			setTimeout(() => {
				this.fetchArticle();
			}, 500);
		}
	}

	render() {
		const article = this.state.articles.map((item, index) => (
			<div className="article-cards">
				<Article title={item.title} content={item.content} />
			</div>
		));

		return (
			<div id="article-container">
				<form
					onSubmit={(event) => {
						this.updateArticle(event);
						this.props.fetchCompany();
					}}
				>
					<input
						onChange={this.handleTitleChange}
						value={this.state.newTitle}
						type="text"
						placeholder="Article Title"
					/>
					<textarea
						onChange={this.handleBodyChange}
						value={this.state.newBody}
						name=""
						id=""
						cols="30"
						rows="10"
						placeholder="Article Content"
					></textarea>
					<button type="submit">Add new article</button>
				</form>
				<div id="articles">
					<ul>{article}</ul>
				</div>
			</div>
		);
	}
}

class Article extends Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false,
		};
		this.toggleFunc = this.toggleFunc.bind(this);
	}

	toggleFunc() {
		this.setState({
			open: !this.state.open,
		});
	}

	render() {
		return (
			<div>
				<a
					role="button"
					onClick={this.toggleFunc}
					aria-controls={this.props.title}
					aria-expanded={this.state.open}
				>
					{this.props.title}
				</a>
				<Collapse in={this.state.open} id={this.props.title}>
					<p>{this.props.content}</p>
				</Collapse>
			</div>
		);
	}
}

export default Articles;
