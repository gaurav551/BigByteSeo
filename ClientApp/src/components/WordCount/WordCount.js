import React, { Component } from 'react';
import Loading from '../UI/Loading';
import ResultsTable from './ResultTable'

export class TextInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      valueToFormat : '',
      words: 0,
      commas: 0,
      fullstops: 0,
      minWords: 'Minimum of 5 words required',
      maxWords: 'No more that 500 words allowed',
      numberErr: 'No numbers allowed',
      noErr:'',
      loading:false,
      warning:'',
      source:'Text',
      inputValue:[],
      wordArray:[],
      wordList:[],
      tableHeader:[],
      tableRow:[]
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.clearInput = this.clearInput.bind(this);
    this.restrictions = this.restrictions.bind(this);
    this.storeInput = this.storeInput.bind(this);
    this.counter = this.counter.bind(this);
  }
  

  handleChange = async(event)=> {
    this.setState({
      valueToFormat : event.target.value,
      value: event.target.value,
      warning: this.restrictions(),
      wordList: this.state.wordArray
    });
    await this.isValidHttpUrl(event.target.value)
    return (
      this.restrictions(),
      this.counter()
    );
  }
   isValidHttpUrl = async(string) =>{
    let url;
    this.setState({loading:true});
    
    try {
      url = new URL(string);
    } catch (_) {
      console.log("False");
      this.setState({
       
        source: "Text"
      })
      this.setState({loading:false});

      return false;  
    }
    console.log("TRUE");
    const urlToFetch =`api/WordCount?url=${string}`;
    const apiResponse = await fetch(urlToFetch)
    const apiData = await apiResponse.json()
    this.setState({
      valueToFormat: apiData,
      source: string
    })
    this.setState({loading:false});
  
    return url.protocol === "http:" || url.protocol === "https:";
    
  }

  counter(event) {
    //Get fullstop & comma count with regex and set state
    var fullstopRegex = /\./g;
    var commaRegex = /,/g;
    var wordRegex = /[^a-z\d\s]+/gi;
    var fullstopCounter = (this.state.valueToFormat.match(fullstopRegex) || []).length;
    var commaCounter = (this.state.valueToFormat.match(commaRegex) || []).length;
    //Get word count without special chars and spaces using regex and set state of 'words'
    var wordCounter = (this.state.valueToFormat.trim()//remove whitespace
                      .replace(/[\W]+/g, ' ')
                      .replace(/([a-z]+)\b[.,]/g, '')//remove commas & fullstops
                      .replace(wordRegex, '')
                      .split(' ')// split words into array elements
                      .filter(function(x){// remove empty array eements
                        return x !== '';
                      }) || []);

    //Set state of counter elements
    this.setState({
      fullstops : fullstopCounter,
      commas : commaCounter,
      words : wordCounter.length
    });
  }

  restrictions() {
    // var number = !isNaN(this.state.valueToFormat);
    // if (number) {
    //   //If number detected warn user
    //   this.setState({warning : this.state.numberErr});
    // }
    // else{
    //   //Clear warning if none of the above
    //   this.setState({warning : this.state.noErr});
    // }
  }

  storeInput() {
    //Replace special chars with a space
    var inputValue = this.state.valueToFormat.replace(/[\W]+/g, ' ');

    //Convert string to lowercase, split into array, sort alphabetically and remove empty values
    var wordArray = inputValue.toLowerCase().split(' ').sort().filter(
      function(x){
        return x !== '';
      });
    this.setState({wordList: wordArray});

    var length = wordArray.length;

    var wordLists = {};

    //Group by First Character
		for (var i = 0; i < length; i ++ ){
			var item = wordArray[i];
			var firstLetter = item.charAt(0);
			wordLists[ firstLetter ] = wordLists[ firstLetter ] || [];
			wordLists[ firstLetter ].push( item );
		}


    //Add table Header
    var thead = Object.keys(wordLists);

    this.setState({
      tableHeader: thead
    });

    //Find object with most largest group of words
    var LargestGroup = 0;
    for (var index in wordLists) {
      if(wordLists[index].length > LargestGroup){
        LargestGroup = wordLists[index].length;
      }
    }
		for(var L = 0; L < LargestGroup+1; L++){
    //Create rows with cells , size largest group
    // TODO:
    //Add in cells and content, if array is less than largest, add empty cell and nobreak space
    // var tableRow = '';
    //   for ( index in wordLists) {
    //     if(!wordLists[index][L]){
    //       tableRow = '';
    //     }else{
    //       tableRow = wordLists[index][L];
    //     }
    //   }
		}
  }

  handleClick(event) {
    //Execute when handleClick is called on an element (button)
    event.preventDefault();
    var words = this.state.value
    var number = words.match(/\d+/g)

    if ((number === null) && (this.state.words < 5)){
      //If wordcount is less than 5 warn user
      console.log('Less than 5'+this.state.words);
      return this.setState({warning : this.state.minWords});
    }
    // if ((number === null) && (this.state.words > 500)) {
    //   //If wordcount is greater than 500 warn user
    //   console.log('500+');
    //   return this.setState({warning : this.state.maxWords});
    // }
    // if (number !== null) {
    //   //If number detected warn user
    //   this.setState({warning : this.state.numberErr});
    // }

    else{
      var storeInputArr = this.storeInput();
      return (
        this.counter(),
        storeInputArr
      );
    }


  }

  clearInput(event) {
    //Clear counters and table
    event.preventDefault();
    this.setState({
      value: '',
      words: 0,
      commas: 0,
      fullstops: 0,
      warning:'',
      wordArray:'',
      tableHeader:[],
      wordList:[]
    });
  }

  

  render() {

    var wordList = this.state.wordList;
    var tableHeader = this.state.tableHeader;

    let loading = "";
    if(this.state.loading)
    {
        loading = <Loading name="Scanning"/>
    }

    return (
      <div>
        {loading}
        {this.state.warning &&
        <div className="alert alert-danger" role="alert">
          <span>{this.state.warning}</span>
        </div>
  }
        <form className="form-input-box">
          <div className='input-group'>
         
          <textarea ref='inputBox' value={this.state.value}  onChange={this.handleChange} style={{resize:'both', overflow:'auto',height:'100px'}} className="form-control" id="c-code"  placeholder="Type a sentence of 5 words or more to get started or enter url"></textarea>
             </div>
        </form>
        <br></br>

        <button onClick={this.handleClick} className="btn btn-default" >
          List words
        </button>

        <button onClick={this.clebuttonrInput} className="btn btn-default" >
          Clear
        </button>
        <br></br>
        <div className='col-sm-12'>
      <div className='card'>
        <div className='card-body'>
          <b>From : {this.state.source}</b>
        <ul className="list-group">
  <li className="list-group-item d-flex justify-content-between align-items-center">
   Words
    <span className="badge bg-primary rounded-pill">{this.state.words}</span>
  </li>
  <li className="list-group-item d-flex justify-content-between align-items-center">
    Commas
    <span className="badge bg-primary rounded-pill">{this.state.commas}</span>
  </li>
  <li className="list-group-item d-flex justify-content-between align-items-center">
    Full-stops
    <span className="badge bg-primary rounded-pill">{this.state.fullstops}</span>
  </li>
</ul>
</div>
</div>
</div>


       
       
         
        

        <ResultsTable wordList={wordList}
          tableHeader={tableHeader}/>

      </div>
    )
  }
}
export default TextInput;