## Environment Requirements

Before this point I will assume that you already set up your CI pipeline and have your app private images in your Container Registry like DockerHub. We can now go ahead and use Kubernetes for the CD of our app

- [Set up](https://docs.aws.amazon.com/cli/v1/userguide/install-macos.html) `awscli`. I think it easy to install using `pip3 install awscli --upgrade --user`, but you need to have Python3 installed in your system which i think is already installed by default for Mac users. To confirm you have aws cli install run `aws`
- Install `kubectl`. The overview is:
  - you download the kubectl binary `curl -LO https://storage.googleapis.com/kubernetes-release/release/v1.23.6/bin/darwin/amd64/kubectl`
  - make the binary executable `chmod +x ./kubectl`
  - move it to ur machine bin folder to be able to globally move it `sudo mv ./kubectl /usr/local/bin/kubectl`.
  - [See](https://kubernetes.io/docs/tasks/tools/install-kubectl-macos/) for more. To confirm you have it install run `kubectl`
- [Set up](https://docs.aws.amazon.com/eks/latest/userguide/install-aws-iam-authenticator.html) `aws-iam-authenticator`. I used homebrew. To login a user run `aws configure` and enter user credentials. To confirm the user that you have locally login into your awscli run `aws sts get-caller-identity` in terminal. Also commands like `aws s3 ls` and `aws ec2 describe-vpcs` should work as well. This step is important because the user credentials will be used by `eksctl` to create the cluster and nodes. This [article](https://repost.aws/en/knowledge-center/eks-cluster-connection) is a good read. **Required IAM permissions:** The IAM security principal that you're using must have permissions to work with Amazon EKS IAM roles, service linked roles, AWS CloudFormation, a VPC, and related resources

## Apply pod deployment and service config to k8s

- We run this command `kubectl apply -f deployment.yaml`. The `deployment.yaml` file is used to specify how our pods should be created. See [doc](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/)
- We run this command `kubectl apply -f service.yaml`. The `service.yaml` file is used to specify how our pods are exposed.

## Pod deployment STATUS

- `ImagePullBackOff` is a Kubernetes waiting status, a grace period with an increased back-off between retries. After the back-off period expires, kubelet will try to pull the image again. This is similar to `CrashLoopBackOff`. See this [article](https://sysdig.com/blog/kubernetes-errimagepull-imagepullbackoff/) to learn why this is
- `CrashLoopBackOff` is not an error itself but a grace period between retries after an error in a container. Back-off time is increased each retry, up to a maximum of five minutes. See this [article](https://sysdig.com/blog/debug-kubernetes-crashloopbackoff/) to learn why this is
- `ErrImagePull` is displayed when kubelet tried to start a container in the Pod, but something was wrong with the image specified in your Pod, Deployment, or ReplicaSet manifest. Eg when you have an invalid docker image tag during your pod deployment or you want to pull a private image but you did not provide the credentials or invalid credentials during the deployment
- `Running` is when the pod is up and running
- `Terminating` is when a pod is deleting itself

## Interacting With Your Cluster

- `kubectl get deployments` Check the deployment names and their pod status
- `kubectl get services` Check name, ClusterIP, and External IP of all deployments
- `kubectl get pods` Check the state of Pods
- `kubectl delete pod <pod_name>` Delete a pod. But Kubernetes will try to generate a new one to maintain the config for number of replicas you set during the deployment of the pod
- `kubectl logs <pod_name> --all-containers` check the logs for containers in your Pod
- For more commands, take a look at this [doc](https://kubernetes.io/docs/reference/kubectl/cheatsheet/) or [here](https://spacelift.io/blog/kubectl-delete-pod)
