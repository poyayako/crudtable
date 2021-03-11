
!grantclienttoconnect

GRANT ALL PRIVILEGES ON *.* TO 'root'@'IPofClient' IDENTIFIED BY 'ROOTPASSWORD';
FLUSH PRIVILEGES;

!draftsqlforgetAllProducts
SELECT tblproduct.PROD_ID,tblproduct.PRODUCTCODE,tblproduct.PRODUCTPRICE,tblproduct.PRODUCTNAME,tblproduct.PRODUCTDESC,tblproduct.PRODUCTSTATUS,tblsize.SIZE,tblcategory.CATEGORYTYPE,tblproduct.DATEUPDATED FROM ((tblproduct INNER JOIN tblsize ON tblproduct.PRODSIZE_ID = tblsize.SIZE_ID) INNER JOIN tblcategory ON tblproduct.PRODCAT_ID = tblcategory.CATEGORY_ID)

!pangkuha ng columns ng database
select * from information_schema.columns
where table_schema = 'your_db'
order by table_name,ordinal_position