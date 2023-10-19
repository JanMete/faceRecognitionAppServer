const returnClarifaiReturnOptions = (imageUrl) => {
  const PAT = process.env.API_CLARIFAI;
  const USER_ID = 'w9l10r27j13x';
  const APP_ID = 'facerecognitionbrain';
  // const MODEL_ID = 'face-detection';
  const IMAGE_URL = imageUrl;

  const raw = JSON.stringify({
    user_app_id: {
      user_id: USER_ID,
      app_id: APP_ID,
    },
    inputs: [
      {
        data: {
          image: {
            url: IMAGE_URL,
          },
        },
      },
    ],
  });
  const requestOptions = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: 'Key ' + PAT,
    },
    body: raw,
  };
  return requestOptions;
};
const handleApiCall = (req, res) => {
  fetch(
    'https://api.clarifai.com/v2/models/face-detection/outputs',
    returnClarifaiReturnOptions(req.body.input)
  )
    .then((response) => response.json())
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(404).json('Unable to work with API.');
    });
};

const handleImage = (req, res, knex) => {
  const { id } = req.body;
  knex('users')
    .where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then((entries) => {
      res.json(entries[0].entries);
    })
    .catch((err) => res.status(404).json('Unable to get entries.'));
};

export default (handleImage, handleApiCall);
