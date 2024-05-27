variable "region" {
  description = "The AWS region in which the resources will be created."
  type        = string
  default     = "us-east-1"
}

variable "availability_zone" {
  description = "The availability zone where the resources will reside."
  type        = string
  default     = "us-east-1a"
}
variable "ami" {
  description = "The ID of the Amazon Machine Image (AMI) used to create the EC2 instance."
  type        = string
  default     = "ami-080e1f13689e07408"
}
variable "instance_type" {
  description = "The type of EC2 instance used to create the instance."
  type        = string
  default     = "t2.micro"
}

locals {
  private_key_path = "/home/kuba/chmury/chmury2.pem"
}