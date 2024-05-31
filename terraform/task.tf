resource "aws_ecs_task_definition" "deploy_ssl_terraform" {
  family                = "deploy-ssl-terraform"
  task_role_arn         = "arn:aws:iam::644906392803:role/LabRole"
  execution_role_arn    = "arn:aws:iam::644906392803:role/LabRole"
  network_mode          = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                   = "1024"
  memory                = "3072"
  runtime_platform {
    cpu_architecture        = "X86_64"
    operating_system_family = "LINUX"
  }

  container_definitions = jsonencode([
    {
      name        = "chmury-backend"
      image       = "644906392803.dkr.ecr.us-east-1.amazonaws.com/chmury-backend"
      cpu         = 0
      essential   = true

      portMappings = [
        {
          containerPort = 3000
          hostPort      = 3000
          protocol      = "tcp"
          name          = "backend"
          appProtocol   = "http"
        }
      ]

      environment = [
        {
          name  = "VITE_CLIENT_IP"
          value = "localhost"
        },
        {
          name  = "VITE_CLIENT_ID"
          value = "12gmsopd070ifi6qhtto3u4arp"
        },
        {
          name  = "VITE_CLIENT_SECRET"
          value = "eelenruoukvui9322gi8bci11ii9j9up1sdgorsd1nohnuio8pj"
        },
        {
          name  = "VITE_CLIENT_PORT"
          value = "443"
        },
        {
          name  = "VITE_DEPLOYMENT_TYPE"
          value = "remote"
        }
      ]

      logConfiguration = {
        logDriver = "awslogs"
        options = {
          awslogs-create-group = "true"
          awslogs-group        = "/ecs/deploy-ssl"
          awslogs-region       = "us-east-1"
          awslogs-stream-prefix = "ecs"
        }
      }
    },
    {
      name        = "chmury-frontend"
      image       = "644906392803.dkr.ecr.us-east-1.amazonaws.com/chmury-frontend"
      cpu         = 0
      essential   = true

      portMappings = [
        {
          containerPort = 443
          hostPort      = 443
          protocol      = "tcp"
          name          = "frontend"
          appProtocol   = "http"
        }
      ]

      environment = [
        {
          name  = "VITE_SERVER_PORT"
          value = "3000"
        },
        {
          name  = "VITE_SERVER_IP"
          value = "localhost"
        },
        {
          name  = "VITE_CLIENT_ID"
          value = "12gmsopd070ifi6qhtto3u4arp"
        },
        {
          name  = "VITE_CLIENT_SECRET"
          value = "eelenruoukvui9322gi8bci11ii9j9up1sdgorsd1nohnuio8pj"
        }
      ]
    }
  ])
}