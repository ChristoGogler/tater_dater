INSERT INTO photos (photo_url, user_id)
SELECT users.profile_url, users.id FROM users 
WHERE NOT users.profile_url = '';