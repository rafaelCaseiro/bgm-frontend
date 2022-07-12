import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`

  :root{
    --background:#F1F1F1;
    --default:#094093;
    --text:#495057;
    --blue: #007bff;
    --indigo: #6610f2;
    --purple: #6f42c1;
    --pink: #e83e8c;
    --red: #dc3545;
    --orange: #fd7e14;
    --yellow: #ffc107;
    --green: #28a745;
    --teal: #20c997;
    --cyan: #17a2b8;
    --white: #ffffff;
    --gray: #7E8299;
    --gray-dark: #3F4254;
    --primary: #3699FF;
    --secondary: #E4E6EF;
    --success: #1BC5BD;
    --info: #8950FC;
    --warning: #FFA800;
    --danger: #F64E60;
    --light: #F3F6F9;
    --dark: #181C32;
    --white: #ffffff;
    --opacity:hsla(0,0%,100%,.1);
  }

  #root, html, body{
    height: 100%;
  }

  * {
    margin:0;
    padding:0;
    box-sizing:border-box;
  }

  html{
    font-size:13px;
    @media (max-width: 1080px){
      font-size: 93.75%;
    }

    @media (max-width: 720px){
      font-size: 87.5%;
    }
    -webkit-text-size-adjust: 100%;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
  }

  body, input, textarea, button{
    font-family: Poppins,Helvetica,sans-serif;
    font-weight: 400;
    
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  
  select:focus-visible {
    outline: none;
    border: solid 1px var(--default);
  }

  /* Firefox */
  input[type="number"] {
    -moz-appearance: textfield;
  }


  h1, h2, h3, h4, h5, h6, strong {
    margin-top: 0;
    font-weight: 500;
    line-height: 1.2;
  }

  a{
    color: var(--default);
    text-decoration: none;
    background-color: transparent;
  }

  label {
    display: inline-block;
    margin-bottom: .5rem;
    font-weight:600
  }

  body {
    background:var(--background);
    -webkit-font-smoothing: antialiased;   
    color: var(--text); 
  }

  body.modal-open {
    height: 100vh;
    overflow-y: hidden;
  }

  button, a {
    cursor: pointer;
    &:hover{
      filter:brightness(0.95) !important;
      -webkit-filter:brightness(0.95) !important;
    }
    &:focus{
      outline: none;
    }
  }

  input, textarea{
    &:focus{
      outline: none !important;
      border: solid 1px var(--default);
    }
  }

  textarea{
    resize: none
  }

  [disabled] {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .swal2-confirm{
    background-color: var(--default) !important;
  }
  .swal2-styled:focus {
    outline: 0;
    box-shadow: none !important;
  }

  .pagination-inner{
    display:flex;
    justify-content:left;
    align-items:center;
    padding:20px 15px 15px;
    list-style: none;
  }



  .pagination-link{
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 2.25rem;
    min-width: 2.25rem;
    padding: 0.5rem;
    border-radius: 3px;
    position: relative;
    font-size: 1rem;
    line-height: 1rem;
    font-weight: 500;
    color: #094093;
    background: #F3F6F9;
    margin-right:5px
  }

  .pagination-disabled a{
    color: #094093 !important;
    opacity: 0.3 !important;
    cursor: not-allowed !important;
  }

  .pagination-active {
    background-color:var(--default);
    color:#fff;
  }

  .animate__animated{
    -webkit-animation-fill-mode: none !important;
    animation-fill-mode: none !important;
  }
  .MuiTabs-root{
    margin-bottom: 20px;
    border-bottom: solid 1px rgba(0,0,0,0.1);
  }
  .MuiTab-textColorPrimary.Mui-selected {
  color: #094093 !important;
  }
  .MuiTouchRipple-root {
    color: #094093 !important;
  }
  .MuiTabs-indicator {
    background-color: #094093 !important;
  }
  .form-control:focus {
    border-color: #094093 !important;
  }
  .MuiTextField-root {
    margin: 0 !important;
  }
  .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"] {
    padding: 0 !important;
  }
  .MuiOutlinedInput-notchedOutline {
    height: calc(1.5em + 1.3rem + 7px) !important;
    border: 1px solid #e2e5ec !important;
    border-radius: 4px !important;
  }
  .MuiOutlinedInput-notchedOutline {
  height: calc(1.5em + 1.3rem + 7px) !important;
  border: 1px solid #e2e5ec !important;
  border-radius: 4px !important;
  }
  .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"]
    .MuiAutocomplete-input:first-child {
    padding: 0.85rem 1rem !important;
    font-size: 1rem !important;
    color: #495057 !important;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    font-family: Poppins, Helvetica, sans-serif;
  }
  .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"]
    .MuiAutocomplete-input:first-child::placeholder {
    color: #495057 !important;
    opacity: 0.85 !important;
  }
  .MuiAutocomplete-endAdornment {
    top: calc(50% - 11px) !important;
  }
  .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: #094093 !important;
  }

  .Mui-checked .MuiTouchRipple-root,
  .Mui-checked .MuiSwitch-thumb {
    color: #47ff4f !important;
  }
  .MuiTouchRipple-root,
  .MuiSwitch-thumb {
    color: #094093 !important;
  }
  .MuiSwitch-track {
    background-color: rgba(0, 0, 0, 0.8) !important;
  }

  .custom-file{
    cursor: pointer;
    display: flex;
    align-items: center;
    position: relative;
    flex: 1 1;
    min-width: 0;
    margin-bottom: 0;
    height: calc(1.5em + 1.3rem + 2px);
  }

  .custom-file-input {
    cursor: pointer;
    position: relative;
    z-index: 2;
    width: 100%;
    height: calc(1.5em + 1.3rem + 2px);
    margin: 0;
    opacity: 0;
  }
  .custom-file-input ~ .custom-file-label::after {
    font-family: "Font Awesome 5 Free";
    content: "\f093" !important;
    display: inline-block;
    vertical-align: middle;
    font-weight: 900;
    cursor: pointer;
  }
  .custom-file-label {
    cursor: pointer;
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    z-index: 1;
    height: calc(1.5em + 1.3rem + 2px);
    padding: 0.65rem 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    border: 1px solid #e2e5ec;
    border-radius: 4px;
    transition: background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    text-align: left;
    overflow: hidden;
    white-space: nowrap;
  }



  .custom-file-label::after {
    cursor: pointer;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 3;
    display: block;
    height: calc(1.5em + 1.3rem);
    padding: 0.65rem 1rem;
    line-height: 1.5;
    color: #495057;
    content: "Browse";
    background-color: #f7f8fa;
    border-left: inherit;
    border-radius: 0 4px 4px 0;
    float:left;
  }

  .text-primary {
    color: #094093 !important;
  }

  a.text-primary:hover,
  a.text-primary:focus {
    color: #2739c1 !important;
  }

  .text-secondary {
    color: #e1e1ef !important;
  }

  a.text-secondary:hover,
  a.text-secondary:focus {
    color: #afafd4 !important;
  }

  .text-success {
    color: #1dc9b7 !important;
  }

  a.text-success:hover,
  a.text-success:focus {
    color: #13867a !important;
  }

  .text-info {
    color: #5578eb !important;
  }

  a.text-info:hover,
  a.text-info:focus {
    color: #1a46da !important;
  }

  .text-warning {
    color: #ffb822 !important;
  }

  a.text-warning:hover,
  a.text-warning:focus {
    color: #d59000 !important;
  }

  .text-danger {
    color: #fd397a !important;
  }

  a.text-danger:hover,
  a.text-danger:focus {
    color: #e7024e !important;
  }

  .text-light {
    color: #f8f9fa !important;
  }

  a.text-light:hover,
  a.text-light:focus {
    color: #cbd3da !important;
  }

  .text-dark {
    color: #343a40 !important;
  }

	@-webkit-keyframes wave {
		from {
			-webkit-transform: rotate(0deg);
			transform: rotate(0deg);
		}
		from {
			-webkit-transform: rotate(360deg);
			transform: rotate(360deg);
		}
	}

	@keyframes wave {
		from {
			-webkit-transform: rotate(0deg);
			transform: rotate(0deg);
		}
		from {
			-webkit-transform: rotate(360deg);
			transform: rotate(360deg);
		}
	}
  .chartjs-render-monitor{
    max-width:100%;
    max-height: 400px;
  }
  .MuiTouchRipple-root, .MuiSwitch-thumb{
    color: rgba(9,64,147, 0.16) !important;
  }
  .MuiSlider-root {
    color: #094093 !important;
  }
  .MuiSlider-thumb.Mui-focusVisible,
  .MuiSlider-thumb:hover {
    box-shadow: 0px 0px 0px 8px rgba(9,64,147, 0.16) !important;
  }
  .MuiSlider-thumb.MuiSlider-active {
    box-shadow: 0px 0px 0px 14px rgba(9,64,147, 0.16) !important;
  }
  .MuiSlider-root span{
    color:var(--default) !important;
  }
  .PrivateValueLabel-circle-4 span{
    color:white !important;
  }
  .rdrNextPrevButton{
    border-radius: 5px !important;
  }
  .rdrMonthAndYearPickers select{
    border-radius: 4px !important;
  }
  .chartjs-render-monitor{
    max-height:none
  }
  .radio{
    display:flex;
    align-items:center;
    
  }

  .radio input{
    margin-right:5px;    
  }

  .fa-hover{
    transition: all 0.3s;
  }
  
  .fa-hover:hover{
    opacity:0.5
  }

  .table-center td, .table-center th{
    text-align:center !important
  }

  .table-no-padding td{
    padding:0
  }

`;
