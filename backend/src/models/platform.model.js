const { DB } = require('../../config');

const getPlatformProfiles = async () => {
    const result = await DB.query('SELECT * FROM platformprofile');
    return result.rows;
};

const addPlatform = async (name, emailaddress1, contactnumber, url, city, filePath) => {
    const newObj = await DB.query(
        'INSERT INTO platformprofile (name, emailaddress1, contactnumber, url, city, image) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [name, emailaddress1, contactnumber, url, city, filePath]
    );
    return newObj.rows[0];
};

const updatePlatform = async (platformId, name, emailaddress1, contactnumber, url, city, image) => {
    let values
    let query
    if (image == null) {
        query = `
            UPDATE platformprofile
            SET name = $1, emailaddress1 = $2, contactnumber = $3, url = $4, city = $5
            WHERE platformid = $6
        `;
        values = [name, emailaddress1, contactnumber, url, city, platformId];
    }
    if (image != null) {
        query = `
            UPDATE platformprofile
            SET name = $1, emailaddress1 = $2, contactnumber = $3, url = $4, city = $5, image = $6
            WHERE platformid = $7
        `;
        values = [name, emailaddress1, contactnumber, url, city, image, platformId];
    }

    await DB.query(query, values);
};

const deletePlatform = async (id) => {
    await DB.query('DELETE FROM platformuserprofile WHERE userprofileid = $1', [id]);
    const result = await DB.query('DELETE FROM platformprofile WHERE platformid = $1', [id]);
    return result.rowCount;
}

module.exports = {
    getPlatformProfiles,
    addPlatform,
    updatePlatform,
    deletePlatform,
};