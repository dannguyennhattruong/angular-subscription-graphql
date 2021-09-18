import { Component, OnInit } from '@angular/core';
import { Apollo, gql, QueryRef } from 'apollo-angular';
import { ExampleService } from '../services/example.service';

//CÁCH 2
// const fakeQuery = gql`
//   query {
//     fake
//   }
// `;

//CÁCH 2
// const subCommand = gql`
//   subscription {
//     personAdded {
//       name
//       _id
//     }
//   }
// `;

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss'],
})
export class ExampleComponent implements OnInit {
  constructor(private exampleService: ExampleService, private apollo: Apollo) {

    // Có 2 cách :
    // + Có thể dùng Query Ref bằng cách mở comment this.subscription ở ngOninit
    // + Dùng class instance subscription của graphql để fetch new person

    //CÁCH 2
    // this.queryRef = apollo.watchQuery({
    //   query: fakeQuery,
    // });

    //CÁCH 1
    exampleService
      .subscriptionAddedPerson()
      .subscribe()
      .subscribe((res) => {
        if (res.data) {
          this.setState({
            persons: [...this.state.persons, res.data?.personAdded],
          });
        }
      });
  }

  state: any = {
    name: '',
    persons: [],
    newPost: {},
  };

  // CÁCH 2
  // queryRef!: QueryRef<any>;

  ngOnInit(): void {
    // CÁCH 2
    // this.subscription();

    this.fetchPerons().then((res: any) => {
      this.setState({
        persons: res.data.persons,
      });
    });
  }

  // CÁCH 2
  // subscription() {
  //   this.queryRef.subscribeToMore({
  //     document: subCommand,
  //     updateQuery: (prev, { subscriptionData }) => {
  //       this.setState({
  //         persons: [...this.state.persons, subscriptionData.data.personAdded],
  //       });
  //     },
  //   });
  // }

  setState = (newState: any) => (this.state = { ...this.state, ...newState });

  onChangeName = (event: any) => this.setState({ name: event.target.value });

  submit = () => {
    this.createPerson(this.state.name).then();
  };

  private async createPerson(name: string) {
    return await this.exampleService.createPerson(name);
  }

  private async fetchPerons() {
    return await this.exampleService.findPerson();
  }
}
