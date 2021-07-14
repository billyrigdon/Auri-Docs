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
			email: {
				platform: "",
				webmail: "",
				emailServer: "",
				domains: ""
			},
			newEmailPlatform: "",
			newEmailWebmail: "",
			newEmailServer: "",
			newEmailDomains: "",
			shareServer: "",
			shareRootPath: "",
			shareOnPrem: false,
			shareDriveLetters: "",
			dns: "",
			ddns: "",
			subnet: "",
			public: "",
			gateway: "",
			domainController: "",
			dhcpServer: "",
			dhcpScope: "",
			routerSubnet: "",
			routerIpAddr: "",
			routerDhcp: false,
			routerPortForwards: "",
			routerNotes: "",
			routerVpn: "",
			wirelessSsid: "",
			wirelessEncryption: "",
			wirelessMgmtURL: "",
			vpnType: "",
			vpnPskLocation: "",
			vpnPublicIP: "",
			vpnClient: ""
		};

		this.fetchCompany = this.fetchCompany.bind(this);
		this.selectCompany = this.selectCompany.bind(this);
		this.changeNav = this.changeNav.bind(this);
		this.fetchAllCompanies = this.fetchAllCompanies.bind(this);
		this.handleNameChange = this.handleNameChange.bind(this);
		this.deleteCompany = this.deleteCompany.bind(this);
		this.createCompany = this.createCompany.bind(this);
		this.handleNewCompanyChange = this.handleNewCompanyChange.bind(this);
		this.handleAddressChange = this.handleAddressChange.bind(this);
		this.handleEmailChange = this.handleEmailChange.bind(this);	
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
		this.updateCompanyInfo = this.updateCompanyInfo.bind(this);
		this.updateEmail = this.updateEmail.bind(this);
		this.handleEmailPlatformChange = this.handleEmailPlatformChange.bind(this);
		this.handleEmailDomainsChange = this.handleEmailDomainsChange.bind(this);
		this.handleEmailServerChange = this.handleEmailServerChange.bind(this);
		this.handleEmailWebmailChange = this.handleEmailWebmailChange.bind(this);
		this.handleShareChange = this.handleShareChange.bind(this);
		this.updateShares = this.updateShares.bind(this);
		this.handleCheckChange = this.handleCheckChange.bind(this);
	};

	fetchCompany() {
		if (this.state.companyName !== "") {
			fetch("http://127.0.0.1:1313/companies/" + this.state.companyName)
				.then(res => res.json())	
				.then(res => this.setState({
					address: res.address,
					emailAddr: res.emailAddr,
					phone: res.phone,
					newAddress: res.address,
					newEmailAddr: res.emailAddr,
					newPhone: res.phone,
					newName: res.name,
					apps: res.apps,
					backups: res.backups,
					newOffsiteTechnology: res.backups.offsiteTechnology,
					newOffsiteWindow: res.backups.offsiteWindow,
					newOffsiteFrequency: res.backups.offsiteFrequency,
					newOffsiteDescription: res.backups.offsiteDescription,
					newOffsiteLocation: res.backups.offsiteLocation,
					newLocalTechnology: res.backups.localTechnology,
					newLocalWindow: res.backups.localWindow,
					newLocalFrequency: res.backups.localFrequency,
					newLocalDescription: res.backups.localDescription,
					newLocalLocation: res.backups.localLocation,
					email: {
						platform: res.email.platform,
						webmail: res.email.webmail,
						server: res.email.server,
						domains: res.email.domains
					},
					newEmailWebmail: res.email.webmail,
					newEmailServer: res.email.server,
					newEmailPlatform: res.email.platform,
					newEmailDomains: res.email.domains,
					shareServer: res.fileShares.server,
					shareOnPrem: res.fileShares.onPrem,
					shareRootPath: res.fileShares.rootPath,
					shareDriveLetters: res.fileShares.driveLetters,
					dns: res.networks.dns,
					ddns: res.networks.ddns,
					subnet: res.networks.subnet,
					public: res.networks.public,
					gateway: res.networks.gateway,
					domainController: res.networks.domainController,
					dhcpServer: res.networks.dhcpServer,
					dhcpScope: res.networks.dhcpScope,
					routerSubnet: res.networks.router.subnet,
					routerIpAddr: res.networks.router.ipAddr,
					routerDhcp: res.networks.router.dhcp,
					routerPortForwards: res.networks.router.portForwards,
					routerNotes: res.networks.router.notes,
					routerVpn: res.networks.router.vpn,
					wirelessSsid: res.networks.wireless.ssid,
					wirelessEncryption: res.networks.wireless.encryption,
					wirelessMgmtURL: res.networks.wireless.mgmtURL,
					vpnType: res.networks.vpn.type,
					vpnPskLocation: res.networks.vpn.pskLocation,
					vpnPublicIP: res.networks.vpn.publicIP,
					vpnClient: res.networks.vpn.client
				}))
		} else {
			this.setState({
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
			email: {
				platform: "",
				webmail: "",
				emailServer: "",
				domains: ""
			},
			newEmailPlatform: "",
			newEmailWebmail: "",
			newEmailServer: "",
			newEmailDomains: "",
			shareServer: "",
			shareRootPath: "",
			shareOnPrem: false,
			shareDriveLetters: "",
			dns: "",
			ddns: "",
			subnet: "",
			public: "",
			gateway: "",
			domainController: "",
			dhcpServer: "",
			dhcpScope: "",
			routerSubnet: "",
			routerIpAddr: "",
			routerDhcp: false,
			routerPortForwards: "",
			routerNotes: "",
			routerVpn: "",
			wirelessSsid: "",
			wirelessEncryption: "",
			wirelessMgmtURL: "",
			vpnType: "",
			vpnPskLocation: "",
			vpnPublicIP: "",
			vpnClient: ""
			})
		}
	};

	fetchAllCompanies() {
		fetch("http://127.0.0.1:1313/companies/")
			.then(res => res.json())
			.then(res => this.setState({
				companyList: res
			}))
	};

//changes the selected company
	selectCompany(e) {
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

//Functions for Company Page
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

	updateCompanyInfo(event) {
		if (this.state.companyName) {
			event.preventDefault();	
			
			const requestOptions = {
				method: "POST",
				headers: {"Content-Type": "application/json"},
				body: JSON.stringify({company: this.state.companyName, newName: this.state.newName, address: this.state.newAddress, phone: this.state.newPhone, emailAddr: this.state.newEmailAddr})
			};
		
			fetch("http://127.0.0.1:1313/companies/" + this.state.companyName + "/info", requestOptions)
				.then(res => res.json())
				.then(this.setState({
					address: this.state.newAddress,
					newAddress: "",
					phone: this.state.newPhone,
					newPhone: "",
					emailAddr: this.state.newEmailAddr,
					newEmailAddr: "",
					companyName: this.state.newName,
					newName: ""
				}))
				.then(setTimeout(()=> {
					this.fetchCompany();
				},500));
		}
	};

	handleNewCompanyChange(event) {
		this.setState({
			newCompany: event.target.value
		});
	};

	handleNameChange(event) {
		this.setState({
			newName: event.target.value
		});
	};

	handleAddressChange(event) {
		this.setState({
			newAddress: event.target.value
		});
	};

	handleEmailChange(event) {
		this.setState({
			newEmailAddr: event.target.value
		});
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
			},500))
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
			},500))
			
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
			},500))
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

//Functions used by email page

	updateEmail(event) {
		event.preventDefault();
		const requestOptions = {
			method: "POST",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify({company: this.state.companyName, email: {
				webmail: this.state.newEmailWebmail,
				platform: this.state.newEmailPlatform,
				domains: this.state.newEmailDomains,
				server: this.state.newEmailServer
			}})
		};

		fetch("http://127.0.0.1:1313/companies/email/" + this.state.companyName, requestOptions)
			.then(res => res.json())
			.then(setTimeout(()=> {
				this.fetchCompany();
			},500))	
	};

	handleEmailPlatformChange(event){
		this.setState({
			newEmailPlatform: event.target.value
		});
	}

	handleEmailWebmailChange(event){
		this.setState({
			newEmailWebmail: event.target.value
		});
	}

	handleEmailServerChange(event){
		this.setState({
			newEmailServer: event.target.value
		});
	}

	handleEmailDomainsChange(event){
		this.setState({
			newEmailDomains: event.target.value
		});
	}

//Functions for Shares component
	updateShares(event) {
		event.preventDefault();
		const requestOptions = {
			method: "POST",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify({company: this.state.companyName, fileShares: {
				server: this.state.shareServer,
				driveLetters: this.state.shareDriveLetters,
				onPrem: this.state.shareOnPrem,
				rootPath: this.state.shareRootPath
			}})
	};	

		fetch("http://127.0.0.1:1313/companies/shares/" + this.state.companyName, requestOptions)
			.then(res => res.json())
			.then(setTimeout(()=> {
				this.fetchCompany();
			},500));
	};

	handleShareChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		});
	}

	handleCheckChange(event) {
		this.setState({
			shareOnPrem: !this.state.shareOnPrem
		});
	}

//React Hooks
	componentDidMount() {
		this.fetchAllCompanies();	
	};

	componentDidUpdate(prevProps,prevState) {
		if (prevState.companyName !== this.state.companyName) {
			setTimeout(()=> {
				this.fetchCompany();
				this.fetchAllCompanies();
			},500)
		} 
	};

	render() {

		if (this.state.nav === "companies" || this.state.companyName === "") {
			return (
				<div id="app-container">
					<Navbar changeNav={this.changeNav} />
					<Topbar  companyList={this.state.companyList} fetchAllCompanies={this.fetchAllCompanies} selectCompany={this.selectCompany} companyName={this.state.companyName}/>
					<h1>{this.state.counter}</h1>
					<div id="content-container">
						<Companies updateCompanyInfo={this.updateCompanyInfo} handlePhoneChange={this.handlePhoneChange} updateCompanyPhone={this.updateCompanyPhone} newEmailAddr={this.state.newEmailAddr} emailAddr={this.state.emailAddr} newPhone={this.state.newPhone} phone={this.state.phone} handleEmailChange={this.handleEmailChange} updateCompanyEmail={this.updateCompanyEmail} handleAddressChange={this.handleAddressChange} updateCompanyAddress={this.updateCompanyAddress} address={this.state.address} newAddress={this.state.newAddress} newCompany={this.state.newCompany} handleNewCompanyChange={this.handleNewCompanyChange} createCompany={this.createCompany} deleteCompany={this.deleteCompany} handleNameChange={this.handleNameChange} newName={this.state.newName} updateCompanyName={this.updateCompanyName} companyList={this.state.companyList} fetchAllCompanies={this.fetchAllCompanies} selectCompany={this.selectCompany} companyName={this.state.companyName} />
					</div>
				</div>
		 	)
		} else if (this.state.nav === "articles") {
			return (
				<div id="app-container">
					<Navbar changeNav={this.changeNav} />
					<Topbar companyList={this.state.companyList} fetchAllCompanies={this.fetchAllCompanies} selectCompany={this.selectCompany} companyName={this.state.companyName}/>
					<div id="content-container">			 		
						<Articles setState={this.setState} fetchCompany={this.fetchCompany} companyName={this.state.companyName} articles={this.state.articles}/>
					</div>
				</div>
		 	)
		} else if (this.state.nav === "applications") {
			return (
				<div id="app-container">
					<Navbar changeNav={this.changeNav} />
					<Topbar companyList={this.state.companyList} fetchAllCompanies={this.fetchAllCompanies} selectCompany={this.selectCompany} companyName={this.state.companyName}/>
					<div id="content-container">			 		
						<Applications createNewApp={this.createNewApp} handleAppNotesChange={this.handleAppNotesChange} updatedAppNotes={this.state.updatedAppNotes} updatedAppInstaller={this.state.updatedAppInstaller} updatedAppName={this.state.updatedAppName} handleAppInstallerChange={this.handleAppInstallerChange} updateApp={this.updateApp} handleAppNameChange={this.handleAppNameChange} deleteApp={this.deleteApp} selectedApp={this.state.selectedApp} selectApp={this.selectApp} apps={this.state.apps} companyName={this.state.companyName} />
					</div>
				</div>
			)
		} else if (this.state.nav === "backups") {
			
			return (
				<div id="app-container">
					<Navbar changeNav={this.changeNav} />
					<Topbar companyList={this.state.companyList} fetchAllCompanies={this.fetchAllCompanies} selectCompany={this.selectCompany} companyName={this.state.companyName}/>
					<div id="content-container">			 		
						<Backups {...this.state} updateBackup={this.updateBackup} handleBackupOWChange={this.handleBackupOWChange} handleBackupOLChange={this.handleBackupOLChange} handleBackupOFChange={this.handleBackupOFChange} handleBackupODChange={this.handleBackupODChange} handleBackupOTChange={this.handleBackupOTChange} handleBackupLWChange={this.handleBackupLWChange} handleBackupLTChange={this.handleBackupLTChange} handleBackupLLChange={this.handleBackupLLChange} handleBackupLFChange={this.handleBackupLFChange} handleBackupLDChange={this.handleBackupLDChange}/>	
					</div>
				</div>
			)
		} else if (this.state.nav === "email") {
			
			return (
				<div id="app-container">
					<Navbar changeNav={this.changeNav} />
					<Topbar companyList={this.state.companyList} fetchAllCompanies={this.fetchAllCompanies} selectCompany={this.selectCompany} companyName={this.state.companyName}/>
					<div id="content-container">			 		
						<Email {...this.state} updateEmail={this.updateEmail} handleEmailWebmailChange={this.handleEmailWebmailChange} handleEmailServerChange={this.handleEmailServerChange} handleEmailPlatformChange={this.handleEmailPlatformChange} handleEmailDomainsChange={this.handleEmailDomainsChange} />	
					</div>
				</div>
			)
		} else if (this.state.nav === "shares") {
			
			return (
				<div id="app-container">
					<Navbar changeNav={this.changeNav} />
					<Topbar companyList={this.state.companyList} fetchAllCompanies={this.fetchAllCompanies} selectCompany={this.selectCompany} companyName={this.state.companyName}/>
					<div id="content-container">			 		
						<Shares {...this.state} handleCheckChange={this.handleCheckChange} updateShares={this.updateShares} handleShareChange={this.handleShareChange}/>	
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
						<span className="material-icons" onClick={() => this.props.changeNav("email")}>mail</span>
						<h5>Email</h5>
					</li>
					<li className="nav-button">
						<span className="material-icons" onClick={() => this.props.changeNav("shares")}>folder</span>
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
				<select name="Dropdown" id="Companies" value="" onChange={this.props.selectCompany}>
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
			},500)
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
					<input onChange={this.handleTitleChange} value={this.state.newTitle} type="text" placeholder="Article Title"/>
					<textarea onChange={this.handleBodyChange} value={this.state.newBody} name="" id="" cols="30" rows="10" placeholder="Article Content"></textarea>
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
				<button className="btn" value={item.name} onClick={this.props.selectCompany}>Select</button>				
			</div>
		)

		return(
			
			<div key={this.props.companyName} id="company-container">
				
				<div id="company-info-container">
					<form className="companyEditFields" onSubmit={this.props.createCompany}>
						<button type="submit" className="btn">Create</button>
						<input onChange={this.props.handleNewCompanyChange} value={this.props.newCompany} placeholder="Enter New Company Name" type="text" required/>	
					</form>
					<div id="current-company-card">
						<h6>Current Company</h6>
						<h4>{this.props.companyName}</h4>
					</div>
					<form className="companyEditFields">
						<h5>Name:</h5>
						<input onChange={this.props.handleNameChange} value={this.props.newName} type="text" required/>
					</form>
					<form className="companyEditFields" onSubmit={this.props.updateCompanyAddress}>
						<h5>Address:</h5>
						<input onChange={this.props.handleAddressChange} value={this.props.newAddress} type="text" required/>
						
					</form>
					<form className="companyEditFields" onSubmit={this.props.updateCompanyEmail}>
						<h5>Email:</h5>
						<input onChange={this.props.handleEmailChange} value={this.props.newEmailAddr} type="email" required />
					</form>
					<form className="companyEditFields" onSubmit={this.props.updateCompanyPhone}>
						<h5>Phone:</h5>
						<input onChange={this.props.handlePhoneChange} value={this.props.newPhone} type="tel" required/>	
					</form>
					<div id="company-buttons">
						<button id="companyUpdate" classname="btn btn-primary" onClick={this.props.updateCompanyInfo}>Save</button>
						<button id="company-delete" className="btn btn-danger" value={this.props.companyName} onClick={this.props.deleteCompany}>Delete</button>
					</div>
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

				<div id="backup-info-container">
					<div className="backup-card">
						<form className="backup-form">
							<h2>Offsite</h2>
							<label htmlFor="technology">Technology </label>
							<input onChange={this.props.handleBackupOTChange} value={this.props.newOffsiteTechnology} placeholder={this.props.backups.offsiteTechnology} />
							<label htmlFor="frequency">Frequency</label>
							<input onChange={this.props.handleBackupOFChange} value={this.props.newOffsiteFrequency} placeholder={this.props.backups.offsiteFrequency} />
							<label htmlFor="Location">Location</label>
							<input onChange={this.props.handleBackupOLChange} value={this.props.newOffsiteLocation} placeholder={this.props.backups.offsiteDescription} />
							<label htmlFor="Window">Window</label>
							<input onChange={this.props.handleBackupOWChange} value={this.props.newOffsiteWindow} />
							<label htmlFor="description">Description</label>
							<textarea onChange={this.props.handleBackupODChange} value={this.props.newOffsiteDescription} placeholder={this.props.backups.offsiteDescription}/>
						</form>
					</div>
					<div className="backup-card">
						<form className="backup-form">
							<h2>Local</h2>
							<label htmlFor="technology">Technology </label>
							<input onChange={this.props.handleBackupLTChange} value={this.props.newLocalTechnology} placeholder={this.props.backups.localTechnology} />
							<label htmlFor="frequency">Frequency</label>
							<input onChange={this.props.handleBackupLFChange} value={this.props.newLocalFrequency} placeholder={this.props.backups.localFrequency} />
							<label htmlFor="Location">Location</label>
							<input onChange={this.props.handleBackupLLChange} value={this.props.newLocalLocation} placeholder={this.props.backups.localDescription} />
							<label htmlFor="Window">Window</label>
							<input onChange={this.props.handleBackupLWChange} value={this.props.newLocalWindow} />	
							<label htmlFor="description">Description</label>
							<textarea onChange={this.props.handleBackupLDChange} value={this.props.newLocalDescription} placeholder={this.props.backups.localDescription}/>
						</form>
					</div>
				</div>
				<button id="save-backup-button" onClick={this.props.updateBackup} className="btn btn-primary">Save</button>
			</div>
		)
	}
}

class Email extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div id="email-container">
				<div id="email-card">
					<label htmlFor="platform">Platform</label>
					<input type="text" value={this.props.newEmailPlatform} onChange={this.props.handleEmailPlatformChange} />
					<label htmlFor="webmail">Webmail</label>
					<input type="text" value={this.props.newEmailWebmail} onChange={this.props.handleEmailWebmailChange}/>
					<label htmlFor="server">Server</label>
					<input type="text" value={this.props.newEmailServer} onChange={this.props.handleEmailServerChange}/>
					<label htmlFor="domains">Domains</label>
					<input type="text" value={this.props.newEmailDomains} onChange={this.props.handleEmailDomainsChange}/>
				</div>
				<button onClick={this.props.updateEmail}>Save</button>
			</div>
		)
	}
}

class Shares extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div id="share-container">
				<div id="share-card">
					<label htmlFor="server">Server</label>
					<input name="shareServer" type="text" value={this.props.shareServer} onChange={this.props.handleShareChange} />
					<label htmlFor="rootpath">Root Path</label>
					<input name="shareRootPath" type="text" value={this.props.shareRootPath} onChange={this.props.handleShareChange}/>
					<label htmlFor="driveletters">Drive Letters</label>
					<input name="shareDriveLetters" type="text" value={this.props.shareDriveLetters} onChange={this.props.handleShareChange}/>
					<label htmlFor="flexSwitchCheckDefault">On Prem</label>
						<form id="on-prem-switch" className="form-check form-switch">
							<input  id="flexSwitchCheckDefault" className="form-check-input" type="checkbox" checked={this.props.shareOnPrem} value={this.props.shareOnPrem} onChange={this.props.handleCheckChange}/>
						</form> 
				</div>
				<button onClick={this.props.updateShares}>Save</button>
			</div>
		)
	}
}


export default App;

