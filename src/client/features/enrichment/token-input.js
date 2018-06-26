const React = require('react');
const h = require('react-hyperscript');
const _ = require('lodash');
const { ServerAPI } = require('../../services/');


class TokenInput extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tokenData: new Map(),
      invalidTokens: ""
    };
  }

  //called onClick 'submit'
  //seperate div text input into an array, remove all elements that have already been validated
  //this method will be altered later depending on the type/format of the final input box (slate or some other library)
  parseTokenList() {
    let tokenList = this.state.query.split(/\s/g);
    //Allow for input edit: parse tokenList to remove all elements that have already been processed and logged to the map 'tokenData'
    //will run when resubmitting data
    this.state.tokenData.forEach( (value, key) => {
      if (tokenList.includes(key)) tokenList = _.pull(tokenList, key);
    });
    //send only new tokens to validation
    this.retrieveValidationAPIResult(tokenList);
  }

  //call validation service API to retrieve unrecognized tokens as an array
  retrieveValidationAPIResult(tokensToValidate){
    ServerAPI.enrichmentAPI({genes: _.pull(tokensToValidate,"")}, "validation").then((result) => {
      //call checkIfValidInput to determine individual token validity
      this.checkIfValidInput(tokensToValidate, result.unrecognized);
      });
  }

  //store input tokens in state map 'tokenData' with values 'true' for valid or 'false' for invalid
  checkIfValidInput(tokensToValidate, unrecognizedTokens)
  {
    tokensToValidate.forEach((element) => {
      if( unrecognizedTokens.includes(element.toUpperCase()) ) this.state.tokenData.set(element, false);
      else this.state.tokenData.set(element, true);
    });
    //display invalid tokens in 'invalid-token' div
    this.updateInvalidStatus();
    //console.log(this.state.tokenData);
  }

  //display all invalid tokens in 'div.invalid-tokens'
  //the mechanism for providing userFeedback will be iterated upon in the future
  //ideally, tokens will be marked in the input box
  updateInvalidStatus()
  {
    this.state.tokenData.forEach((value, key) => {
      if (value == false) this.state.invalidTokens += key + "\n";
    });
    this.setState({invalidTokens: "invalid ex: \ngene1 \ngene2 \n"});
    // console.log(this.state.invalidTokens);
    // console.log(this.state.tokenData);
  }

  //called onInput in 'gene-input-box'
  //dynamically update 'tokenData' map to remove any keys that are no longer present in the token list
  //display these changes in 'invalid-tokens' div
  handleChange(e) {
    this.state.query = e.target.innerText;
    //Allow for input edit: remove tokens from invalid box as soon as they are no longer present in input box
    //will run when resubmitting data
    this.state.tokenData.forEach( (value, key, mapObj) => {
      if (this.state.query.includes(key) == false ) mapObj.delete(key);
      this.updateInvalidStatus();
    });
  }


  render() {
    return ([
        h('div.gene-input-container', [
          h('div.gene-input-box', {
            placeholder: 'Enter one gene per line',
            contentEditable: true,
            id: 'gene-input-box',
            onInput: (e) => this.handleChange(e)
          })
        ]),
        h('submit-container', {
          onClick: () => {this.parseTokenList();} },
          [h('button.submit', 'Submit')]
        ),
        h('div.invalid-token-container', [
          h('textarea.invalid-tokens-feedback',{
            value: this.state.invalidTokens,
            readOnly: true
          })
        ])
    ]);
  }

}

module.exports = TokenInput;


