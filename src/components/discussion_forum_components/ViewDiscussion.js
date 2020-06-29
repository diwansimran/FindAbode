import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import axios from 'axios';
import Links from '../../components/Links';
import Footer from '../../components/Footer';

const Answer = props => (
    <div class="card mb-3">
        <h5 class="card-title">{props.answer.user}</h5>
        <p class="card-text">{props.answer.ans}</p>
    </div>
  )

  export default class ViewDiscussion extends Component {
    static contextType = UserContext;

    constructor(props) {
        super(props);
        this.handleSubmit= this.handleSubmit.bind(this);
        this.answerList = this.answerList.bind(this);
        this.handleChange=this.handleChange.bind(this);
        this.state = {
            newans:"",
            answers: []
      };
      }

      componentDidMount() {
        axios.get('https://project-group16.herokuapp.com/discussionforum/'+this.props.match.params.topic)
      //  axios.get('http://localhost:5000/discussionforum/'+this.props.match.params.topic)
          .then(response => {this.setState({ 
            answers: response.data
                })})
          .catch((error) => {
            console.log(error);
          })
          }

          answerList() {
            return this.state.answers.map(currentanswer => {
              return <Answer answer={currentanswer} key={currentanswer._id}/>;
            })
          }

          handleChange(e){
            let target = e.target;
            let value = target.value;
    

            this.setState({
                newans: value
            })
        }

          async handleSubmit(e){
            e.preventDefault();
       //     console.log("hii"+this.state.newans);
            let { login } = this.context;
            const { email } = this.context;
            let usrdata=[];
       //     console.log("email:"+email);
            if(login==false){
                this.props.history.push({
                    pathname: '/signin/'
                });
            }else{
                if(this.state.newans!=""){
                    let detail={}
                  //  const { data } = await axios.get('http://localhost:5000/signup/' + email);
                    const { data } = await axios.get('https://project-group16.herokuapp.com/signup/' + email);
                    detail= data[0];
    //                console.log(detail.username);

                  //  axios.post('http://localhost:5000/discussionforum/'+this.props.match.params.topic+'/addans' ,
                    axios.post('https://project-group16.herokuapp.com/discussionforum/'+this.props.match.params.topic+'/addans' , 
                    {
                        ans:this.state.newans,
                        email:email,
                        user:detail.username
                    })
                    .then(res => console.log(res.data));
                   window.location.reload();
                    
                }else{
                    alert('Please write your response.');
                }
            }
            
          }

    render() {
      return (
        <div style={{ marginTop: 65 }}>
        <h3 class="text-center">Topic: {this.props.match.params.topic}</h3>
        <div class="m-5">{ this.answerList() }
        <div>
            <form onSubmit={this.handleSubmit}>
                <div>
                    <textarea id="newans"  placeholder="Please write your response here..." style={{height:"170px"},{width:"100%"}} value={this.state.newans} onChange={this.handleChange}></textarea>
                </div>
            <button>Post</button>
            </form>
        </div>
        </div>
        
        <Links/>
		<Footer/>
        </div>
      )
    }
  }