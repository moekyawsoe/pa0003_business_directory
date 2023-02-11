-- Active: 1669450439251@@127.0.0.1@3306@business_directory_db
INSERT INTO `business_directory_db`.`tbl_business`
(
`user_id`,
`bus_name`,
`bus_des`,
`bus_type`,
`bus_category`,
`bus_phone`,
`bus_work_phone`,
`bus_email`,
`bus_fb_page`,
`bus_address`,
`createdAt`,
`updatedAt`)
VALUES
(1, 'Mobiles Sale', '', 2, 2, '09123456789', '', '', '', 'KyautTaw', now(), now());


-- data query for business list page
SELECT 
	tbb.id,
    tbb.user_id,
    (SELECT username FROM tbl_users WHERE id = tbb.user_id) as owner,
    tbb.bus_name,
    tbb.bus_des,
    tbb.bus_type,
    (SELECT type_name FROM tbl_bus_types WHERE id = tbb.bus_type) as type_name,
    tbb.bus_category,
    (SELECT category_name FROM tbl_bus_category WHERE id = tbb.bus_category) as category_name,
    tbb.bus_phone,
    tbb.bus_address
FROM tbl_business as tbb;
