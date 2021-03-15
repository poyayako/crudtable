
!grantclienttoconnect

GRANT ALL PRIVILEGES ON *.* TO 'root'@'IPofClient' IDENTIFIED BY 'ROOTPASSWORD';
GRANT ALL PRIVILEGES ON *.* TO 'root'@'IPofClient' IDENTIFIED BY '';
FLUSH PRIVILEGES;

!draftsqlforgetAllProducts
create view showallproducts AS SELECT tblproduct.PRODUCT_ID,tblproduct.PRODUCTCODE,tblproduct.PRODUCTPRICE,tblproduct.PRODUCTNAME,tblproduct.PRODUCTDESC,tblproduct.PRODUCTSTATUS,tblsize.SIZE,tblcategory.CATEGORYTYPE,tblproduct.DATEUPDATED FROM ((tblproduct INNER JOIN tblsize ON tblproduct.PRODUCTSIZE_ID = tblsize.SIZE_ID) INNER JOIN tblcategory ON tblproduct.PRODUCTCAT_ID = tblcategory.CATEGORY_ID)


!pangkuha ng columns ng database
select * from information_schema.columns
where table_schema = 'your_db'
order by table_name,ordinal_position

!export database thru CLI
mysqldump –u username –p db_name > dump_file.sql
