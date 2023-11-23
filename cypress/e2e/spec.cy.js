/// <reference types= "cypress" />
describe('APItesting', () => {

const Randomisbn =Math.floor(Math.random()*15550)
const Randomaisle =Math.floor(Math.random()*17550)
let authorName=[
'Alice Smith',
'Bob Johnson',
'Charlie Brown',
'David Taylor',
'Eva Miller',
'Frank Davis',
'Grace Anderson',
'Harry White',
'Ivy Jones',
'Jack Martin']
const RandomauthorName =Math.floor(Math.random()*authorName.length)

  it('Test post method', () => {
   
    const requestBody ={
      name:"Qa private Zoom",
      isbn:Randomisbn,
      aisle:Randomaisle,
      author:authorName[RandomauthorName],
      }
      
cy.request({
  method:"POST",
  url:"https://rahulshettyacademy.com/Library/Addbook.php",
  body:requestBody
}).then((Response)=>{
  //cy.log(Response.status)//يطبع على الشاشة السوداء الحالة والرد
  cy.log(Response.body)//يطبع معلومات الكتاب الذي تم اظافته
  expect(Response.status).to.eq(200)
  expect(Response.body.Msg).to.eq("successfully added")
})

  })
it('Test get metod', () => {


  cy.request({
    method:"GET",
    url:`https://rahulshettyacademy.com/Library/GetBook.php?ID=${Randomisbn}${Randomaisle}`,//حرف ذ
   
  }).then((Response)=>{
     
     cy.log(Response.body[0].book_name)
     expect(Response.status).to.eq(200)
     expect(Response.body[0].author).to.eq(`${authorName[RandomauthorName]}`)
  })
  
});
it('test delete method', () => {
  const requestBody ={
    "ID":`${Randomisbn}${Randomaisle}`
  }
  cy.request({
    method:"DELETE",
    url:"https://rahulshettyacademy.com/Library/DeleteBook.php",
    body:requestBody
  }).then((Response)=>{
    cy.log(Response.status)
    cy.log(Response.body)
    expect(Response.status).to.eq(200)
    expect(Response.body.msg).to.eq("book is successfully deleted")
  })

  
});
})