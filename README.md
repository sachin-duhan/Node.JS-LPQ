### ROUTES  Details
The example is implemented in node.js with the restify package.
1.  client: GET &rarr; `/deferredjob`
2.  server: `202`, location: `/monitor/:job_id`. This tells the client that the job has started, but the result will eventually be available. The client knows when the results are available by periodically checking `/monitor/:job_id`, found in the header's `Location:`.
3.  client: GET &rarr; `/monitor/:job_id`
  - if `201`, then the long-running job is complete, GET the final results at `/result/:job_id`, found in the header's `Location:`.
  - if `200`, then the job is not complete, try again (GET &rarr; `/monitor/:job_id`) in the future.
4. client: repeat Step 3 until job is finished and server provides `201 - Created`
5. client: GET &rarr; `/result/:job_id` to get the results of the long-running job.

### Testing & Coverage ###
A basic test is included. It tries to determine if:
1.  the API allows for a client to start a long-running job,
2.  the API provides a way for the client to determine if the results of the long-running job are available, and,
3.  the server should provide those results to the client when thay are available

Test coverage is incomplete, e.g., no input validation is performed,  edge cases are not considered, etc. Do not use this code except for study.