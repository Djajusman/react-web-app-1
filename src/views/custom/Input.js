import React from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import Switch from "react-switch";


class Input extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			isFocus: false,
			isInternalFilled: false
		}
	}

	toggleFocus = (e) =>{
		let is_focus = this.state.isFocus === 'is-focused' ? '':'is-focused';
		this.setState({
			isFocus: is_focus
		});

		this.setState({
			isInternalFilled: (e.target.value.length > 0) ? true:false
		})
	}

	render(){
		const {id, type, label, name, required, changeListener, value, is_filled, defaultValue, disabled, is_floating} = this.props;

		let v = (typeof value !== 'undefined') ? value.toString():''; // cast to string so length check is possible
		let isFilled = "";
		if(v && v.length > 0){
			isFilled = "is-filled";
		}

		if(this.state.isInternalFilled){
			isFilled = "is-filled";
		}

		var isFloating = is_floating;
		if(typeof is_floating === 'undefined'){
			isFloating = true;
		}
		
		return (
			<div className={`form-group bmd-form-group ${this.state.isFocus} ${isFilled}`}>
				<label htmlFor={id} className={isFloating ? "bmd-label-floating":""}>{label}</label>
				<input
					type={type || 'text'}
					name={name}
					defaultValue={v}
					className="form-control" 
					onChange={changeListener}
					id={id}
					required={required || false}
					disabled={disabled}
					onFocus={this.toggleFocus.bind(this)} 
					onBlur={this.toggleFocus.bind(this)} />
            </div>
		);
	}
}

class InputGroup extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		const {id, type, label, name, required, icon, placeholder, changeListener, value} = this.props;
		return (
			<span className="bmd-form-group">
				<div className="input-group" id="input-login">
					<div className="input-group-prepend">
						<span className="input-group-text">
						<i class={icon} aria-hidden="true"></i>
							{/* <i className="material-icons">{icon}</i> */}
						</span>
					</div>
					<input
						type={type}
						name={name}
						value={value}
						className="form-control"
						onChange={changeListener}
						id={id}
						placeholder={placeholder}
						required={required} />
				</div>
			</span>
		);
	}
}
class MaterialIcon extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		const {icon} = this.props;
		return(
		<i className="material-icons">{icon}</i>
		)
	}
}

class ActionButton extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		const {icon, onclick, btncolor, is_disabled, label,is_left, class_name} = this.props;
		return(
			<a href="#" onClick={onclick} className={`${class_name} btn ${btncolor} ${is_disabled !=null && is_disabled? "disabled":""}`}>
				{(is_left == null || is_left) && <MaterialIcon icon={icon}></MaterialIcon>}{label?" "+ label+" ":""}{is_left !=null && !is_left && <MaterialIcon icon={icon}></MaterialIcon>}
			</a>
		);
	}
}


class CheckBox extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		const {name, value, label, is_checked, onclick} = this.props;
		return(
			<div className="form-check">
				<label className="form-check-label">
				<input
					className="form-check-input"
					type="checkbox"
					name={name}
					value={value}
					onClick={onclick}
					checked={is_checked}/> {label}
				<span className="form-check-sign">
					<span className="check"></span>
				</span>
				</label>
			</div>
		);
	}
}

class RadioBox extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		const {name, value, disabled,label, is_checked, changeListener} = this.props;
		return(
			<div className="form-check">
				<label className="form-check-label">
				<input

				   disabled={disabled}
					className="form-check-input"
					type="radio"
					name={name}
					value={value}
					onChange={changeListener}
					checked={is_checked} /> {label}
				<span className="circle">
					<span className="check"></span>
				</span>
				</label>
			</div>
		);
	}
}

class SelectBox extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		const {id, type, label, disabled, name, required, changeListener, value, className, options, selected, multiple} = this.props;
		return(
			<div className={`form-group bmd-form-group`}>
				<label htmlFor={id}>{label}</label>
				<Select
				styles={{ menuPortal: base => {
					const { zIndex, ...rest } = base;  // remove zIndex from base by destructuring
					return { ...rest, zIndex: 9999 };
				}}}
				menuPortalTarget={document.body}
					inputId={id}
					options={options}
					onChange={changeListener}
					name={name}
					className="sel"
					value={selected}
					isMulti={multiple}
					disabled={disabled}
				/>
            </div>
		);
	}
}

class ProgressBar extends React.Component{

	constructor(props){
		super(props);

	}

	render(){
		const {name, value} = this.props;
		return(
		<div name={name} className={`progress`} style="height: 20px;">
  			<div className={`progress-bar`} role="progressbar" style={{width: "25%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
				  <span className="sr-only">20 %</span>
			  </div>
		</div>
		);
	}

}

class SwitchButton extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			checked: null,
			hiddenInputId: ''
		};
	}

	componentDidMount(){
		const {id} = this.props;
		if(id.length > 0){
			this.setState({
				hiddenInputId: id
			});

			document.querySelector('#'+id).setAttribute('name', id);
			document.querySelector('#'+id).value = 'off';
		}
	}

	handleChange = (checked) => {
		const{changeListener} = this.props
		this.setState({checked}, () =>{
			document.querySelector('#'+this.state.hiddenInputId).value = (this.state.checked) ? 'on':'off';
		});
		changeListener(checked);
	}

	render(){
		const {id, label, checked} = this.props;
		// let _checked = this.state.checked;
		// if(typeof checked !== 'undefined' && this.state.checked === null){
		// 	_checked = checked;
		// }

		// if(_checked === null){
		// 	_checked = false;
		// }

		return(
			<div className={`form-group bmd-form-group`}>
				<label htmlFor={id}>{label}</label> &nbsp;
				
				<Switch
					id={id}
					checked={checked}
					onChange={this.handleChange.bind(this)}
				/>
            </div>
		);
	}
}

class Datepicker extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			isFocus: false,
			isInternalFilled: false,
			date: props.value
		}
	}

	toggleFocus = (e) =>{
		let is_focus = this.state.isFocus === 'is-focused' ? '':'is-focused';
		this.setState({
			isFocus: is_focus
		});

		this.setState({
			isInternalFilled: (e.target.value.length > 0) ? true:false
		})
	}

	render(){
		const {id, type, label, name, required, changeListener, value, is_filled, defaultValue} = this.props;
		const CustomInput = ({ value, onClick, onChange, onFocus, onBlur}) => (
			<input
				type="text"
				className="form-control"
				onClick={onClick}
				value={value}
				onChange={onChange}
				id={id}
				 />
		);

		let isFilled = "";
		if(value && value.length > 0){
			isFilled = "is-filled";
		}

		if(this.state.isInternalFilled){
			isFilled = "is-filled";
		}
		
		return (
			<div className={`form-group bmd-form-group ${this.state.isFocus} ${isFilled}`}>
				<label htmlFor={id}>{label}</label>
				<DatePicker
					dateFormat="yyyy-MM-dd"
					selected={this.state.date}
					onChange={date=>this.setState({date})}
					customInput={<CustomInput />}
					showYearDropdown
					yearDropdownItemNumber={5}
					scrollableYearDropdown
				/>
            </div>
		);
	}
}

export default Input;
export {CheckBox, RadioBox, InputGroup, SelectBox, Datepicker, SwitchButton, ActionButton,ProgressBar, MaterialIcon};