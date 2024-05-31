resource "aws_ecs_cluster" "chmury-terra-cluster" {
  name = "chmury-terraform-cluster"

  setting {
    name  = "containerInsights"
    value = "enabled"
  }
}
resource "aws_cloudwatch_log_group" "example" {
  name = "example"
}

resource "aws_ecs_service" "deploy_ssl_service" {
  name            = "deploy-ssl-service"
  cluster         = aws_ecs_cluster.chmury-terra-cluster.name
  task_definition = aws_ecs_task_definition.deploy_ssl_terraform.arn
  desired_count   = 1
  launch_type     = "FARGATE"

  network_configuration {
    subnets         = [aws_subnet.terra_subnet.id]
    security_groups = [aws_security_group.terra_SG.id]
    assign_public_ip = true
  }


  deployment_controller {
    type = "ECS"
  }

}