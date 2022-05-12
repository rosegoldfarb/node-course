// console.log('Before');
// getUser(1, (user) => {
//   getRepositories(user.gitHubUsername, (repos) => {
//     getCommits(repos[0], (commits) => {
//       console.log(commits);
//     })
//   })
// });
// console.log('After');


// promise based approach
// getUser(1)
//     .then(user => getRepositories(user.gitHubUsername))
//     .then(repos => getCommits(repos[0]))
//     .then(commits => console.log('commits: ', commits))
//     .catch(err => console(err.message));


// async and await approach
async function displayCommits() {
    try {
        const user = await getUser(1);
        const repos = await getRepositories(user.gitHubUsername);
        const commits = await getCommits(repos[0]);
        console.log(commits);
    } catch {
        console.log('error: ', err.message);
    }
}

displayCommits();

function getUser(id) {
    return new Promise((resolve, reject) =>
    {
        setTimeout(() => {
            console.log('Reading a user from a database...');
            resolve({ id: id, gitHubUsername: 'rose' });
          }, 2000);
    });
}

function getRepositories(username) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Calling GitHub API...');
            resolve(['repo1', 'repo2', 'repo3']);
          }, 2000);
    });
}

function getCommits(repo) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Calling GitHub API...');
            resolve(['commit']);
          }, 2000);
    });
}





// console.log('before');
// getUser(1, getRepositories);
// console.log('after');
// function getRepositories(user){
//     getRepositories(user.gitHubUsername, getCommits)
// }

// function getCommits(repos){
//     getCommits(repo, displayCommits);
// }

// function displayCommits(commits){
//     console.log(commits);
// }

// function getUser(id, callback){
//     setTimeout(() => {
//         console.log('reading user')
//         callback({ id: id, gitHubUsername: 'Rose'});
        
//     }, 2000);
// }

// function getRepositories(username, callback){
//     setTimeout(() => {
//         console.log('returning repos')
//         callback(['repo1', 'repo2', 'repo3']) 
//     }, 2000);
// 
// }



// console.log('before');
// getUser(1, getRepositories);
// console.log('after');

// function displayCommits(commits) {
//     console.log(commits);
// }

// function getCommits(repos) {
//     getCommits(repos, displayCommits)
// }

// function getCommits(repos, callback){
//     callback(repos);
// }

// function getRepositories(user) {
//     getRepositories(user, getCommits)
// }

// function displayUser(user) {
//     console.log(user);
// }

// function getUser(id, callback) {
//     setTimeout(() => {
//         console.log('reading user');
//         callback({id: id, gitHubUsername: 'rose'});
//     }, 2000);
// }

// function getRepositories(username, callback) {
//     setTimeout(() => {
//         console.log('getting repos');
//         callback(['repo1', 'repo2', 'repo3']);
//     }, 2000);
// }
