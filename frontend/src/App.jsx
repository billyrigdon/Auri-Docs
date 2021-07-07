import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';


//Parent Component
class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			nav: "companies",
			companyList: [],
			companyName: "",
			newCompany: "",
			newName: "",
			address: "",
			newAddress: "",
			emailAddr: "",
			newEmailAddr: "",
			phone: "",
			newPhone: "",
			articles: [],
			apps: [],
			selectedApp: {},
			updatedAppName: "",
			updatedAppInstaller: "",
			updatedAppNotes: "",
			backups: {
				offsiteTechnology: "",
				offsiteWindow: "",
				offsiteFrequency: "",
				offsiteDescription: "",
				offsiteLocation: "",
				localTechnology: "",
				localWindow: "",
				localFrequency: "",
				localDescription: "",
				localLocation: ""
			},
			newOffsiteTechnology: "",
			newOffsiteWindow: "",
			newOffsiteFrequency: "",
			newOffsiteDescription: "",
			newOffsiteLocation: "",
			newLocalTechnology: "",
			newLocalWindow: "",
			newLocalFrequency: "",
			newLocalDescription: "",
			newLocalLocation: "",
		};

		this.fetchCompany = this.fetchCompany.bind(this);
		this.updateCompany = this.updateCompany.bind(this);
		this.changeNav = this.changeNav.bind(this);
		this.fetchAllCompanies = this.fetchAllCompanies.bind(this);
		this.updateCompanyName = this.updateCompanyName.bind(this);
		this.handleNameChange = this.handleNameChange.bind(this);
		this.deleteCompany = this.deleteCompany.bind(this);
		this.createCompany = this.createCompany.bind(this);
		this.handleNewCompanyChange = this.handleNewCompanyChange.bind(this);
		this.handleAddressChange = this.handleAddressChange.bind(this);
		this.updateCompanyAddress = this.updateCompanyAddress.bind(this);
		this.updateCompanyEmail = this.updateCompanyEmail.bind(this);
		this.handleEmailChange = this.handleEmailChange.bind(this);	
		this.updateCompanyPhone = this.updateCompanyPhone.bind(this);
		this.handlePhoneChange = this.handlePhoneChange.bind(this);
		this.selectApp = this.selectApp.bind(this);
		this.deleteApp = this.deleteApp.bind(this);
		this.handleAppNameChange = this.handleAppNameChange.bind(this);
		this.handleAppInstallerChange = this.handleAppInstallerChange.bind(this);
		this.handleAppNotesChange = this.handleAppNotesChange.bind(this);
		this.updateApp = this.updateApp.bind(this);
		this.createNewApp = this.createNewApp.bind(this);
		this.handleBackupOTChange = this.handleBackupOTChange.bind(this);
		this.handleBackupODChange = this.handleBackupODChange.bind(this);
		this.handleBackupOFChange = this.handleBackupOFChange.bind(this);
		this.handleBackupOLChange = this.handleBackupOLChange.bind(this);
		this.handleBackupOWChange = this.handleBackupOWChange.bind(this);
		this.handleBackupLDChange = this.handleBackupLDChange.bind(this);
		this.handleBackupLFChange = this.handleBackupLFChange.bind(this);
		this.handleBackupLLChange = this.handleBackupLLChange.bind(this);
		this.handleBackupLTChange = this.handleBackupLTChange.bind(this);
		this.handleBackupLWChange = this.handleBackupLWChange.bind(this);
		this.updateBackup = this.updateBackup.bind(this);
	};

	fetchCompany() {
		fetch("http://127.0.0.1:1313/companies/" + this.state.companyName)
			.then(res => res.json())	
			.then(res => this.setState({
				address: res.address,
				emailAddr: res.emailAddr,
				phone: res.phone,
				apps: res.apps,
				backups: res.backups
			}))
	};

	fetchAllCompanies() {
		fetch("http://127.0.0.1:1313/companies/")
			.then(res => res.json())
			.then(res => this.setState({
				companyList: res
			}))
	};

//changes the selected company
	updateCompany(e) {
		this.setState({
			companyName: e.target.value
		});
	};
//changes the content view based on the selected nav state
	changeNav(navValue) {
		if (this.state.companyName) {
			this.setState({
				nav: navValue
			});
		}
	};

//functions to handle creating/deleting companies
	createCompany(event) {
		if (event.target.value !== "") {
			event.preventDefault();

			const requestOptions = {
				method: "POST",
				headers: {"Content-Type": "application/json"},
				body: JSON.stringify({company: this.state.newCompany})
			};

			fetch("http://127.0.0.1:1313/companies/create", requestOptions)
				.then(res => res.json())
				.then(this.setState({
					companyName: this.state.newCompany,
					newCompany: ""
				}));
		}
	};

	handleNewCompanyChange(event) {
		this.setState({
			newCompany: event.target.value
		});
	};

	deleteCompany(event) {
		event.preventDefault();

		const requestOptions = {
			method: "POST",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify({company: event.target.value})
		};
		
		fetch("http://127.0.0.1:1313/companies/" + event.target.value + "/delete", requestOptions)
			.then(res => res.json())
			.then(this.setState({
				companyName: ""
			}))
	};

//functions to handle company name updates
	updateCompanyName(event) {
		if (this.state.companyName) {
			if (event.target.value !== "") {
				event.preventDefault();

				const requestOptions = {
					method: "POST",
					headers: {"Content-Type": "application/json"},
					body: JSON.stringify({company: this.state.companyName, newName: this.state.newName})
				};
		
				fetch("http://127.0.0.1:1313/companies/" + this.state.companyName + "/name", requestOptions)
					.then(res => res.json())
					.then(this.setState({
						companyName: this.state.newName,
						newName: ""
					}));
			}
		}	
	};

	handleNameChange(event) {
		this.setState({
			newName: event.target.value
		});
	};

//Functions to update company information 
	updateCompanyAddress(event) {
		if (this.state.companyName) {
			if (event.target.value !== "") {
				event.preventDefault();

				const requestOptions = {
					method: "POST",
					headers: {"Content-Type": "application/json"},
					body: JSON.stringify({company: this.state.companyName, address: this.state.newAddress})
				};
		
				fetch("http://127.0.0.1:1313/companies/" + this.state.companyName + "/address", requestOptions)
					.then(res => res.json())
					.then(this.setState({
						address: this.state.newAddress,
						newAddress: ""
					}));
			}
		}
	};

	handleAddressChange(event) {
		this.setState({
			newAddress: event.target.value
		});
	};

	updateCompanyEmail(event) {
		if (this.state.companyName) {
			if (event.target.value !== "") {
				event.preventDefault();

				const requestOptions = {
					method: "POST",
					headers: {"Content-Type": "application/json"},
					body: JSON.stringify({company: this.state.companyName, emailAddr: this.state.newEmailAddr})
				};
		
				fetch("http://127.0.0.1:1313/companies/" + this.state.companyName + "/email", requestOptions)
					.then(res => res.json())
					.then(this.setState({
						emailAddr: this.state.newEmailAddr,
						newEmailAddr: ""
					}));
			}
		}
	};

	handleEmailChange(event) {
		this.setState({
			newEmailAddr: event.target.value
		});
	};

	updateCompanyPhone(event) {
		if (this.state.companyName) {
			if (event.target.value !== "") {
				event.preventDefault();

				const requestOptions = {
					method: "POST",
					headers: {"Content-Type": "application/json"},
					body: JSON.stringify({company: this.state.companyName, phone: this.state.newPhone})
				};
		
				fetch("http://127.0.0.1:1313/companies/" + this.state.companyName + "/phone", requestOptions)
					.then(res => res.json())
					.then(this.setState({
						phone: this.state.newPhone,
						newPhone: ""
					}));
			}
		}
	};

	handlePhoneChange(event) {
		this.setState({
			newPhone: event.target.value
		});
	};

//Functions used by App page

	selectApp(appObj) {
		this.setState({
			selectedApp: appObj,
			updatedApp: appObj,
			updatedAppName: appObj.name,
			updatedAppInstaller: appObj.installer,
			updatedAppNotes: appObj.notes
		});
	};

	deleteApp(event) {
		event.preventDefault();

		const requestOptions = {
			method: "POST",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify({company: this.state.companyName, app: this.state.selectedApp})
		};
	
		fetch("http://127.0.0.1:1313/companies/apps/" + this.state.companyName + "/delete", requestOptions)
			.then(res => res.json())
			.then(this.setState({
				selectedApp: "",
				updatedApp: "",
				updatedAppName: "",
				updatedAppInstaller: "",
				updatedAppNotes: ""
			}))
			.then(setTimeout(()=> {
				this.fetchCompany();
			},1200))
	};

	updateApp(event) {
		event.preventDefault();
		const requestOptions = {
			method: "POST",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify({company: this.state.companyName, app: this.state.selectedApp, updatedApp: {name: this.state.updatedAppName, installer: this.state.updatedAppInstaller, notes: this.state.updatedAppNotes}})
		};
	
		fetch("http://127.0.0.1:1313/companies/apps/" + this.state.companyName + "/update", requestOptions)
			.then(res => res.json())
			.then(this.setState({
				selectedApp: "",
				updatedAppName: "",
				updatedAppInstaller: "",
				updatedAppNotes: ""
			}))
			.then(setTimeout(()=> {
				this.fetchCompany();
			},1200))
			
	};

	handleAppNameChange(event) {
		this.setState({
			updatedAppName: event.target.value
		});
	};

	handleAppInstallerChange(event) {
		this.setState({
			updatedAppInstaller: event.target.value
		});
	};

	handleAppNotesChange(event) {
		this.setState({
			updatedAppNotes: event.target.value
		});
	};

	createNewApp(event) {
		event.preventDefault();
		this.setState({
			selectedApp: "",
			updatedAppName: "",
			updatedAppInstaller: "",
			updatedAppNotes: ""
		});
	};

//Functions used by Backup page

	updateBackup(event) {		
		event.preventDefault();

		const requestOptions = {
			method: "POST",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify({company: this.state.companyName, backups: {
				offsiteTechnology: this.state.newOffsiteTechnology,
				offsiteWindow: this.state.newOffsiteWindow,
				offsiteDescription: this.state.newOffsiteDescription,
				offsiteLocation: this.state.newOffsiteLocation,
				offsiteFrequency: this.state.newOffsiteFrequency,
				localTechnology: this.state.newLocalTechnology,
				localWindow: this.state.newLocalWindow,
				localDescription: this.state.newLocalDescription,
				localLocation: this.state.newLocalLocation,
				localFrequency: this.state.newLocalDescription
			}}
		)
		};
		
		fetch("http://127.0.0.1:1313/companies/backups/" + this.state.companyName + "/update", requestOptions)
			.then(res => res.json())
			.then(this.setState({
				newOffsiteTechnology: "",
				newOffsiteWindow: "",
				newOffsiteFrequency: "",
				newOffsiteDescription: "",
				newOffsiteLocation: "",
				newLocalTechnology: "",
				newLocalWindow: "",
				newLocalFrequency: "",
				newLocalDescription: "",
				newLocalLocation: ""
			}))
			.then(setTimeout(()=> {
				this.fetchCompany();
			},1200))
	};

	handleBackupOTChange(event) {
		this.setState({
			newOffsiteTechnology: event.target.value
		});
	};

	
	handleBackupOWChange(event) {
		this.setState({
			newOffsiteWindow: event.target.value
		});
	};

	handleBackupOFChange(event) {
		this.setState({
			newOffsiteFrequency: event.target.value
		});
	};

	handleBackupODChange(event) {
		this.setState({
			newOffsiteDescription: event.target.value
		});
	};

	handleBackupOLChange(event) {
		this.setState({
			newOffsiteLocation: event.target.value
		});
	};

	handleBackupLTChange(event) {
		this.setState({
			newLocalTechnology: event.target.value
		});
	};
	
	handleBackupLWChange(event) {
		this.setState({
			newLocalWindow: event.target.value
		});
	};

	handleBackupLFChange(event) {
		this.setState({
			newLocalFrequency: event.target.value
		});
	};

	handleBackupLDChange(event) {
		this.setState({
			newLocalDescription: event.target.value
		});
	};

	handleBackupLLChange(event) {
		this.setState({
			newLocalLocation: event.target.value
		});
	};

//React Hooks
	componentDidMount() {
		this.fetchAllCompanies();	
	};

	componentDidUpdate(prevProps,prevState) {
		if (prevState.companyName !== this.state.companyName) {
			setTimeout(()=> {
				this.fetchCompany();
				this.fetchAllCompanies();
			},1200)
		} 
	};

	render() {

		if (this.state.nav === "companies" || this.state.companyName === "") {
			return (
				<div id="app-container">
					<Navbar changeNav={this.changeNav} />
					<Topbar  companyList={this.state.companyList} fetchAllCompanies={this.fetchAllCompanies} updateCompany={this.updateCompany} companyName={this.state.companyName}/>
					<h1>{this.state.counter}</h1>
					<div id="content-container">
						<Companies handlePhoneChange={this.handlePhoneChange} updateCompanyPhone={this.updateCompanyPhone} newEmailAddr={this.state.newEmailAddr} emailAddr={this.state.emailAddr} newPhone={this.state.newPhone} phone={this.state.phone} handleEmailChange={this.handleEmailChange} updateCompanyEmail={this.updateCompanyEmail} handleAddressChange={this.handleAddressChange} updateCompanyAddress={this.updateCompanyAddress} address={this.state.address} newAddress={this.state.newAddress} newCompany={this.state.newCompany} handleNewCompanyChange={this.handleNewCompanyChange} createCompany={this.createCompany} deleteCompany={this.deleteCompany} handleNameChange={this.handleNameChange} newName={this.state.newName} updateCompanyName={this.updateCompanyName} companyList={this.state.companyList} fetchAllCompanies={this.fetchAllCompanies} updateCompany={this.updateCompany} companyName={this.state.companyName} />
					</div>
				</div>
		 	)
		} else if (this.state.nav === "articles") {
			return (
				<div id="app-container">
					<Navbar changeNav={this.changeNav} />
					<Topbar companyList={this.state.companyList} fetchAllCompanies={this.fetchAllCompanies} updateCompany={this.updateCompany} companyName={this.state.companyName}/>
					<div id="content-container">			 		
						<Articles setState={this.setState} fetchCompany={this.fetchCompany} companyName={this.state.companyName} articles={this.state.articles}/>
					</div>
				</div>
		 	)
		} else if (this.state.nav === "applications") {
			return (
				<div id="app-container">
					<Navbar changeNav={this.changeNav} />
					<Topbar companyList={this.state.companyList} fetchAllCompanies={this.fetchAllCompanies} updateCompany={this.updateCompany} companyName={this.state.companyName}/>
					<div id="content-container">			 		
						<Applications createNewApp={this.createNewApp} handleAppNotesChange={this.handleAppNotesChange} updatedAppNotes={this.state.updatedAppNotes} updatedAppInstaller={this.state.updatedAppInstaller} updatedAppName={this.state.updatedAppName} handleAppInstallerChange={this.handleAppInstallerChange} updateApp={this.updateApp} handleAppNameChange={this.handleAppNameChange} deleteApp={this.deleteApp} selectedApp={this.state.selectedApp} selectApp={this.selectApp} apps={this.state.apps} companyName={this.state.companyName} />
					</div>
				</div>
			)
		} else if (this.state.nav === "backups") {
			
			return (
				<div id="app-container">
					<Navbar changeNav={this.changeNav} />
					<Topbar companyList={this.state.companyList} fetchAllCompanies={this.fetchAllCompanies} updateCompany={this.updateCompany} companyName={this.state.companyName}/>
					<div id="content-container">			 		
						<Backups {...this.state} updateBackup={this.updateBackup} handleBackupOWChange={this.handleBackupOWChange} handleBackupOLChange={this.handleBackupOLChange} handleBackupOFChange={this.handleBackupOFChange} handleBackupODChange={this.handleBackupODChange} handleBackupOTChange={this.handleBackupOTChange} handleBackupLWChange={this.handleBackupLWChange} handleBackupLTChange={this.handleBackupLTChange} handleBackupLLChange={this.handleBackupLLChange} handleBackupLFChange={this.handleBackupLFChange} handleBackupLDChange={this.handleBackupLDChange}/>	
					</div>
				</div>
			)
		}
	}
};

//Navbar
class Navbar extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<nav id="navbar">
				<ul>
					<li className="nav-button" onClick={() => this.props.changeNav("companies")}>
						<span className="material-icons">business</span>
						<h5>Companies</h5>
					</li>
					<li className="nav-button" onClick={() => this.props.changeNav("articles")}>
						<span className="material-icons">book</span>
						<h5>Articles</h5>
					</li>
					<li className="nav-button" onClick={() => this.props.changeNav("applications")}>
						<span className="material-icons">apps</span>
						<h5>Apps</h5>
					</li>
					<li className="nav-button" onClick={() => this.props.changeNav("backups")}>
						<span className="material-icons">cloud_upload</span>
						<h5>Backup</h5>
					</li>
					<li className="nav-button">
						<span className="material-icons">mail</span>
						<h5>Email</h5>
					</li>
					<li className="nav-button">
						<span className="material-icons">folder</span>
						<h5>File Shares</h5>
					</li>
					<li className="nav-button">
						<span className="material-icons">wifi</span>
						<h5>Networks</h5>
					</li>
					<li className="nav-button">
						<span className="material-icons">storage</span>
						<h5>Servers</h5>
					</li>
				</ul>
			</nav>

		)
	}
}

class Topbar extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const allCompanies = this.props.companyList.map((item) =>
			<option value={item.name}>{item.name}</option>
		)  
		
		return (
			<div id="topbar">
				<div id="logo">
					<span className="material-icons">pets</span>
					<h1>Auri</h1>
				</div>
				<input type="text" />
				<select name="Dropdown" id="Companies" value="" onChange={this.props.updateCompany}>
					<option value="">{this.props.companyName}</option>
					{allCompanies}
				</select>
				<span class="material-icons">
					account_circle
				</span>
			</div>
		)
	}
}

//Articles Section
class Articles extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			newTitle: "",
			newBody: "",
			articles: [],
			companyName: this.props.companyName
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

	fetchArticle() {
		fetch("http://127.0.0.1:1313/companies/" + this.state.companyName)
			.then(res => res.json())	
			.then(res => this.setState({
				articles: res.articles
			}))
	};

	updateArticle(event) {
		event.preventDefault();
		const requestOptions = {
			method: "POST",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify({company: this.props.companyName, title: this.state.newTitle, content: this.state.newBody})
		};
		
		fetch("http://127.0.0.1:1313/companies/articles/" + this.props.companyName, requestOptions)
			.then(res => res.json())
		
		this.setState({
			articles: [...this.state.articles,{title: this.state.newTitle,content:this.state.newBody}],
			newTitle: "",
			newBody: ""
		});			
	};

	componentDidMount() {
		this.fetchArticle();
	}

	componentWillReceiveProps(nextProps) {
		this.setState({ companyName: nextProps.companyName});  
	}

	
	componentDidUpdate(prevProps,prevState) {
		if (this.state.companyName !== prevState.companyName) {
			setTimeout(()=> {
				this.fetchArticle();
			},1200)
		} 
	};

	render() {
		const article = this.state.articles.map((item,index) => 
			<div className="article-cards">
				<h3 className="article-title">
					<a data-toggle="collapse" data-target={"#article-content-"+ item.title.split(" ").join("-") + index.toString()} aria-expanded="false" aria-controls={"article-content-" + item.title + index.toString()}>
						{item.title}<span class="material-icons">expand_more</span>
					</a>
				</h3>
				<div class="collapse" id={"article-content-" +item.title.split(" ").join("-") + index.toString()}>
					<p>{item.content}</p>
				</div>
			</div>	
		)
		
		return (
			<div id="article-container">
				<form onSubmit={(event) => {this.updateArticle(event); this.props.fetchCompany()}}>
					<input onChange={this.handleTitleChange} value={this.state.newTitle} type="text" />
					<textarea onChange={this.handleBodyChange} value={this.state.newBody} name="" id="" cols="30" rows="10"></textarea>
					<button type="submit">Add new article</button>
				</form>
				<div id="articles">
					<ul>
						{article}
					</ul>
				</div>
			</div>

		)
	}
}

class Companies extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			companyName: this.props.companyName
		}
	};

	render() {
		const allCompanies = this.props.companyList.map((item) =>
			<div className="companyCard">
				<h6>{item.name}</h6>
				<button className="btn" value={item.name} onClick={this.props.updateCompany}>Select</button>				
			</div>
		)

		return(
			
			<div key={this.props.companyName} id="company-container">
				
				<div id="company-info-container">
					<form className="companyEditFields" onSubmit={this.props.createCompany}>
						<button type="submit" className="btn">Create</button>
						<input onChange={this.props.handleNewCompanyChange} value={this.props.newCompany} placeholder="Enter New Company Name"type="text" required/>	
					</form>
					<div id="current-company-card">
						<h6>Current Company</h6>
						<h4>{this.props.companyName}</h4>
					</div>
					<form className="companyEditFields" onSubmit={this.props.updateCompanyName}>
						<button type="submit" className="btn">Update</button>
						<input onChange={this.props.handleNameChange} value={this.props.newName} placeholder={"Name: " + this.props.companyName} type="text" required/>
					</form>
					<form className="companyEditFields" onSubmit={this.props.updateCompanyAddress}>
						<button type="submit" className="btn">Update</button>
						<input onChange={this.props.handleAddressChange} value={this.props.newAddress} placeholder={"Address: " + this.props.address} type="text" required/>
						
					</form>
					<form className="companyEditFields" onSubmit={this.props.updateCompanyEmail}>
						<button type="submit" className="btn">Update</button>
						<input onChange={this.props.handleEmailChange} value={this.props.newEmailAddr} placeholder={"Email: " + this.props.emailAddr} type="email" required />
					</form>
					<form className="companyEditFields" onSubmit={this.props.updateCompanyPhone}>
						<button type="submit" className="btn">Update</button>
						<input onChange={this.props.handlePhoneChange} value={this.props.newPhone} placeholder={"Phone: " + this.props.phone} type="tel" required/>	
					</form>
					<button id="company-delete" className="btn btn-danger" value={this.props.companyName} onClick={this.props.deleteCompany}>Delete</button>
				</div>

				<div id="card-container">
					{allCompanies}
				</div>
				
			</div>
		)
	}
}

class Applications extends React.Component {
	constructor(props) {
		super(props);
	};

	render() {

		const app = this.props.apps.map((item,index) => 
			<div className="app-cards">
				<h3 className="app-title">
					<a>
						{item.name}
					</a>	
				</h3>
				<button onClick={() => {this.props.selectApp(item)}}>Select</button>
			</div>	
		)

		return (
			<div id="applications-container">
				<form id="app-info">
					<input onChange={this.props.handleAppNameChange} value={this.props.updatedAppName} placeholder="App Name" />
					<input onChange={this.props.handleAppInstallerChange} value={this.props.updatedAppInstaller} placeholder="Installer location" />
					<textarea onChange={this.props.handleAppNotesChange} value={this.props.updatedAppNotes} placeholder="App Notes"/>
					<button id="save-app-button" onClick={this.props.updateApp} className="btn btn-primary">Save</button>
					<button className="btn btn-danger" onClick={this.props.deleteApp}>Delete</button>
					
				</form>
				<div id="app-card-container">
					<div id="appList">
						{app}
					</div>
					<button id="create-app-button" onClick={this.props.createNewApp}>Create New App</button>
				</div>
			</div>
		)
	}
}

class Backups extends React.Component {
	constructor(props){
		super(props);
	};

	render() {
		return (
			<div id="backup-container">
				<form id="backup-info">
					<input onChange={this.props.handleBackupOTChange} value={this.props.newOffsiteTechnology} placeholder={this.props.backups.offsiteTechnology} />
					<input onChange={this.props.handleBackupOFChange} value={this.props.newOffsiteFrequency} placeholder={this.props.backups.offsiteFrequency} />
					<textarea onChange={this.props.handleBackupODChange} value={this.props.newOffsiteDescription} placeholder={this.props.backups.offsiteDescription}/>
					<button id="save-app-button" onClick={this.props.updateBackup} className="btn btn-primary">Save</button>	
				</form>
			</div>
		)
	}
}

export default App;

/*
<input onChange={this.props.handleBackupOFChange} value={this.props.updatedBackups.offsiteFrequency} placeholder={this.props.updatedBackups.offsiteFrequency} />
<textarea onChange={this.props.handleBackupODChange} value={this.props.updatedBackups.offsiteDescription} placeholder={this.props.updatedBackups.offsiteDescription}/>
<button id="save-app-button" onClick={this.props.updateBackup} className="btn btn-primary">Save</button>
*/