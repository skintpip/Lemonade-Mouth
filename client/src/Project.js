import React from 'react';
import ReactDOM from 'react-dom/client';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import './Project.css';


class QntyHandler extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: props.name,
			qnty: props.qnty,
			qntyMsg: "Enter qnty"
		};
	}

	render() {
		return(
			<div className="qnty-section">
				<div>{this.state.name}: {this.state.qnty}</div>
				<TextField inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} id="outlined-basic" label={this.state.qntyMsg} variant="outlined" size="small" inputRef={ref => {this.inputRef = ref}}/>
				<div><Button variant="contained" onClick={() => {
					let newQnty = this.state.qnty + Number(this.inputRef.value);
					this.setState({
						name: this.state.name,
						qnty: newQnty,
						qntyMsg: "Enter qnty"
					});
				}}>
				add Items</Button></div>
				<div><Button variant="contained"onClick={() => {
					let newQnty = this.state.qnty - Number(this.inputRef.value);
					if (newQnty < 0) {
						this.setState({
						name: this.state.name,
						qnty: this.state.qnty,
						qntyMsg: "Please enter a qnty < current"
					});
					} else {
					this.setState({
						name: this.state.name,
						qnty: newQnty,
						qntyMsg: "Enter qnty"
					});
				}
				}}>
				remove Items</Button></div>
			</div>);
		}
}

class ProjectMember extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: props.name,
			users: ["Spencer", "John", "Scarlet"]
		};
	}
	userSection() {
		let text = "";
		let users = this.state.users;
		for(let i = 0; i < this.state.users.length; i++) {
			text += this.state.users[i];
			if(i !== this.state.users.length - 1) {
				text += ", ";
			}
		}
			return text;
	}
	render() {
		return(
			<div className="project-member">
				<div>{this.state.name}</div>
				<div>{this.userSection()}</div>
				<div>
					<ul className="no-bullets">
						<li><QntyHandler name="HWSet1" qnty={Number("50")}/></li>
					  <li><QntyHandler name="HWSet2" qnty={Number("50")}/></li>
					</ul>
				</div>
			</div>
		);
	}
}

export class Project extends React.Component {
	render() {
	    return (
	      <div className="project">
	        <div>
	          <ProjectMember name="Project1"/>
	        </div>
	      </div>
	    );
	  }
}


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Project />);
