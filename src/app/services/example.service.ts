import { gql, Mutation, Query, Subscription } from 'apollo-angular';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CreatePersonGQL extends Mutation {
  document = gql`
    mutation createPerson($name: String!) {
      createPerson(payload: { name: $name }) {
        _id
        name
      }
    }
  `;
}

@Injectable({
  providedIn: 'root',
})
export class AllPersonGQL extends Query<Response> {
  document = gql`
    query {
      persons {
        name
        _id
      }
    }
  `;
}

@Injectable({
  providedIn: 'root',
})
export class NewPersonGQL extends Subscription {
  document = gql`
    subscription {
      personAdded {
        name
        _id
      }
    }
  `;
}

@Injectable({
  providedIn: 'root',
})
export class ExampleService {
  constructor(
    private createPersonGQL: CreatePersonGQL,
    private allPersonGQL: AllPersonGQL,
    private newPersonGQL : NewPersonGQL
  ) {}

  async createPerson(name: string) {
    return this.createPersonGQL
      .mutate({
        name,
      })
      .toPromise();
  }

  async findPerson() {
    return this.allPersonGQL.fetch().toPromise();
  }

  subscriptionAddedPerson() {
    return this.newPersonGQL;
  }
}
