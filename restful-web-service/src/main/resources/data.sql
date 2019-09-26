insert into todo(id,username,description)
values(1,'bekir1','Learn play to guitar');

insert into todo(id,username,description)
values(2,'ahmet1','Learn to dance');

insert into todo(id,username,description)
values(3,'ali1','Learn to speak russian');

insert into todo_item(id,todoid,name,username,description,target_date,created_date,is_done)
values(1,1,'first','bekir1','meet to guitar',sysdate(),sysdate(),false);

insert into todo_item(id,todoid,name,username,description,target_date,created_date,is_done)
values(2,1,'second','bekir1','go to guitar course',sysdate(),sysdate(),false);

insert into todo_item(id,todoid,name,username,description,target_date,created_date,is_done)
values(3,1,'third','bekir1','play to guitar',sysdate(),sysdate(),false);


insert into todo_item(id,todoid,name,username,description,target_date,created_date,is_done)
values(4,2,'first','ahmet1','select one of dance type',sysdate(),sysdate(),false);

insert into todo_item(id,todoid,name,username,description,target_date,created_date,is_done)
values(5,2,'second','ahmet1','go to dance course',sysdate(),sysdate(),false);

insert into todo_item(id,todoid,name,username,description,target_date,created_date,is_done)
values(6,2,'third','ahmet1','dance with your teacher',sysdate(),sysdate(),false);

insert into todo_item(id,todoid,name,username,description,target_date,created_date,is_done)
values(7,3,'first','ali1','practice to grammer',sysdate(),sysdate(),false);

insert into todo_item(id,todoid,name,username,description,target_date,created_date,is_done)
values(8,3,'second','ali1','go to russian course',sysdate(),sysdate(),false);

insert into todo_item(id,todoid,name,username,description,target_date,created_date,is_done)
values(9,3,'third','ali1','speak to russian',sysdate(),sysdate(),false);

insert into users(id,firstname,lastname,password,username)
values(1,'bekir','mataracı','bekir123','bekir1');

insert into users(id,firstname,lastname,password,username)
values(2,'ali','aslan','ali123','ali1');

insert into users(id,firstname,lastname,password,username)
values(3,'ahmet','aydın','ahmet123','ahmet1');
