## LOGIC FOR SOLUTION

Logic - I believe that we can solve this problem using NodeJs, that I am proficient with. Before I present my overview for the problem in hand here are a few points that I must mentions : 
I don't know-how is the file processed.
I don't know how is this CSV processing needs to be atomic or not - it seems yes, but not clear.
I don't know if you want to block the upload function completely or you merely block it because you can't abort the previous job. Such a thing needs to be designed with the task specifics in mind.
Below is my approach to solve the problem at hand and here are a few scenarios, depending on your requirements.

Under the assumption that the 100,000 rows in the CSV are individual "work items", and the whole CSV of them is a "batch of work", you can, on upload, simply create a queue of 100,000 things to process. Also, hold a hashmap of these work items, so you can address them by the batch. Also have a work dispatch protocol and a node Microservice that takes the rows to process, one by one, and take them off this batch queue into another queue, "pending batch finish". Once it is all completed, mark those "pending finish" as "completely completed" and clear the batch. Expose a "Cancel batch work" functionality to the user, if they click "cancel current batch", you clean up all the pending tasks so that your worker microservice stops processing these.

Also, mark the batch as cancelled, so you can clean up the work items that Ire already completed. If you can't break processing into items ( maybe you're aggregating things over those 100,000 rows), perhaps you can run this aggregation in an interruptible loop. Then your "Cancel batch work" would first check if there are running aggregations and interrupt/abort them, then proceed as planned and run the new file.

Your least flexible option is to at least provide upload queue - the first file uploaded is getting processed, and now you expose an endpoint where you can upload additional CSVs. They are just sent to the server and are waiting. You can still cancel those "pending" CSVs and upload new ones instead, even if you can't break the main, running CSV. Then expose a simple "status" endpoint where you can indicate your status to the user, e.g. "processed 40,000 of 100,000 rows, 3 CSVs pending processing". You would have to keep all those locks and things outside the running process - Redis is probably the simplest to use - because you might be running these tasks (upload, processing, statuses) on different servers, or at the very least, different workers in your Node cluster instance.

Hence, You definitely need a queuing system. That is because it's a long-running job (as you mentioned magnitude of hours). The queuing system can be a simple custom solution based on a database or even plain filesystem or full-fledged queueing systems like ActiveMQ etc. 

