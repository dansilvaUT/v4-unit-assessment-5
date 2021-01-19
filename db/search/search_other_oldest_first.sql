SELECT p.id AS post_id,
title, 
content,
img,
profile_pic,
username AS author_username,
date_created
FROM helo_posts p
JOIN helo_users u ON u.id = p.author_id
WHERE id != u.id
ORDER BY date_created ASC;