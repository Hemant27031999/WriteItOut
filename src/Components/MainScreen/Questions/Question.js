import React from 'react';
import u_blank from './like.png';
import u_filled from './liked.png';
import {StyleRoot} from 'radium';


class Question extends React.Component {

	constructor(props){
		super(props);
		console.log("Question: ", props);
		this.state = {
			question_id: this.props.question_id,
			question: this.props.question,
			name: this.props.username,
			description: this.props.description,
      upvotes: this.props.upvotes,
      imageURL: this.props.imagepath,
      userid: this.props.userid,
      datetime: this.props.datetime,
      liked: this.props.liked,
      currentuserid: this.props.currentuserid
		}
	}

  likeToggle = () => {
    fetch('http://127.0.0.1:3001/likeUnlikeQuestion',{
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body:JSON.stringify({
        userid: this.state.currentuserid,
        queid: this.state.question_id,
        like: !this.state.liked
      })
    })
    .then(response => response.json())
    .then(data => {
        if(data.status) {
            this.setState({
              liked: !this.state.liked,
              upvotes: data.data.upvotes
            })
        }
        else{
          alert("Error: " + data.data.message)
        }
    })
    .catch(err => {
        alert("Error: " + err)
    });
  }

  openQuestion = () => {
    alert("Question clicked, open the question window.")
  }

  openOtherUserProfile = () => {
    alert("Other user profile clicked, open his profile.")
  }

render(){
	return (
		<StyleRoot>
			<div className="w-100 mv2 bg-moon-gray v-mid br3 ph2 pointer" onClick={ this.openQuestion }>
          <div className="dt pa2">
						<div className="dtc pa1 v-mid dim" onClick={ (e) => {
                                                          e.stopPropagation();
                                                          this.openOtherUserProfile();
                                                        }}>
							<img className="dtc br-100 fc h3 w3" src={ this.state.imageURL } alt="profilePic"/>
						</div>
						<div className="dtc tl dim" onClick={ (e) => {
                                                  e.stopPropagation();
                                                  this.openOtherUserProfile();
                                                }}>
							<p className="f5 ma2" style={{ fontFamily: 'Acme' }}> <strong> { this.state.name }</strong> <br/> { this.state.description } <br/> { this.state.datetime }</p>
						</div>
					</div>
          <hr/>
		  		<h1 className="black tl">
		  			{this.state.question}
		  		</h1>
					<hr/>
					<div className="tl pa2">
	          {
	            this.state.liked === true?
	            <img className="dib dim h2 w2 mr1" src={ u_filled } alt="like" onClick={ (e) => {
                e.stopPropagation();
                this.likeToggle();
              }}/>:
	            <img className="dib dim h2 w2" src={ u_blank } alt="unlike" onClick={ (e) => {
                e.stopPropagation();
                this.likeToggle();
              }}/>
	          }
	          <p className="dib f3">{ this.state.upvotes }</p>
					</div>
			</div>
			</StyleRoot>
		);
	}
}

export default Question;
