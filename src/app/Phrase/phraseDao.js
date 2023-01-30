async function getAPhrase(connection) {
    const getAPhraseQuery = `
    Select *
    From PhraseTBL
    Order by rand()
    Limit 1;`;

    const getAPhraseRow = await connection.query(getAPhraseQuery);
    return getAPhraseRow[0];
  }

  module.exports = {
    getAPhrase
  };