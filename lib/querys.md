# Queries ejecutadas en el curso en GraphiQL

## Alias y Fragments

```graphql
{
  AllCourses: getCourses{
    ...CourseFields
  }

  Course1: getCourse(id: "5cb4b8ce75f954a0585f7be2"){
    ...CourseFields
    teacher
  }

  Course2: getCourse(id: "5cb4b8ce75f954a0585f7be4"){
    ...CourseFields
    topic
  }
}

fragment CourseFields on Course {
  _id
  title
  description
  people {
    _id
    name
  }
}


```

*Variables*

```
mutation addPersonaCourse2($course: ID!, $person: ID!) {
  addPeople(courseID: $course, persondID: $person) {
    _id
    title
  }
}
```
*query variables*
```
{
  "course": "5f656764675c33cd7cfb3dde",
  "person": "5f6782aedc8d0d80e5ae407d"
}
*agrega una persona con monitor*
mutation createMonitor($monitorimput: PersonInput!){
  createPerson(input: $monitorimput){
    _id
    name
  }
}
```
*QUERY VARIABLES*
```
{
  "monitorimput" : {
    "name" : "monitor 1",
    "email": "monitor1@gmail.com",
    "phone": "5533-4455"
  }
}
```
*consultando los cambios*
```
{
  getPeople{
    _id
    name
    email
    ...on Monitor{
      phone
    }
    ...on Student{
      avatar
    }
    
  }
}
```

*agregando directivas*
```
query getPeopleData($monitor: Boolean!, $avatar: Boolean!){
  getPeople{
    _id
    name
    
    ...on Monitor @include(if: $monitor) {
      phone
    }
    ...on Student @include(if: $avatar) {
    	email
      avatar
    }
    
  }
}
```
*QUERY VARIABLES*
```
{
  "monitor": false,
  "avatar": true
}
```

*EJECUTANDO BUSQUEDA GLOBAL*

```
{
  searchItems(keyword: "1"){
    __typename
    ...on Course{
      title
      description
    }
    ...on Monitor{
      name
      phone
    }
    ...on Student{
      name
      email
    }
  }
}
```