use serde::{Deserialize, Serialize};
use serde_json::{from_str};
use std::os::windows::process::CommandExt;
use std::process::Command;
use reqwest::Client;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let mut ctx = tauri::generate_context!();

    tauri::Builder::default()
        .setup(|app| {
            #[cfg(desktop)]
            {
                use tauri_plugin_autostart::MacosLauncher;
                use tauri_plugin_autostart::ManagerExt;

                let _ = app.handle()
                    .plugin(
                        tauri_plugin_autostart::init(
                            MacosLauncher::LaunchAgent,
                            Some(vec![]),
                        )
                    );

                // Get the autostart manager
                let autostart_manager = app.autolaunch();
                // Enable autostart
                let _ = autostart_manager.enable();

                use tauri::Manager;
                use tauri::{
                    menu::{Menu, MenuItem},
                    tray::{TrayIconBuilder, TrayIconEvent, MouseButton, MouseButtonState},
                };

                let close_item = MenuItem::with_id(app, "close", "Close", true, None::<&str>)?;
                let menu = Menu::with_items(app, &[&close_item])?;

                TrayIconBuilder::new()
                    .icon(app.default_window_icon().unwrap().clone())
                    .menu(&menu)
                    .menu_on_left_click(false)
                    .on_menu_event(
                        |app, event| match event.id.as_ref() {
                            "close" => app.exit(0),
                            _ => {
                                println!("menu item {:?} not handled", event.id);
                            }
                        }
                    )
                    .on_tray_icon_event(|tray, event| match event {
                        TrayIconEvent::Click {
                            button: MouseButton::Left,
                            button_state: MouseButtonState::Up,
                            ..
                        } => {
                            // in this example, let's show and focus the main window when the tray is clicked
                            let app = tray.app_handle();

                            if let Some(window) = app.get_webview_window("main") {
                                let _ = window.show();
                                let _ = window.set_focus();
                            }
                        }
                        _ => {}
                    })
                    .build(app)?;
            }
            Ok(())
        })
        // Init plugin and auto restore window theme !!!
        .plugin(tauri_plugin_theme::init(ctx.config_mut()))
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![
            token_is_actual,
            get_computer_data
        ])
        .run(ctx)
        .expect("error while running tauri application");
}

#[derive(Debug, Serialize, Deserialize)]
struct TokenComputerData {
    token: String,

    cpu: Data,
    gpu: Data,
}

#[derive(Debug, Serialize, Deserialize)]
struct ComputerData {
    cpu: Data,
    gpu: Data,
}

#[derive(Debug, Serialize, Deserialize)]
struct Data {
    min: String,
    avg: String,
    max: String,
}

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn token_is_actual() -> bool {
    return false;
}

#[tauri::command(async)]
async fn get_computer_data() -> TokenComputerData {
    let binding = execute_command();
    let binding_json = binding.as_str();
    let computer_data: ComputerData = from_str(binding_json).unwrap();

    let token = "".to_string();
    let cpu: Data = computer_data.cpu;
    let gpu: Data = computer_data.gpu;

    let new_computer_data = TokenComputerData {
        token: token,
        cpu: cpu,
        gpu: gpu,
    };

    let _ = Client::new()
        .post("http://localhost:7777/api/v1/temperature")
        .json(&new_computer_data)
        .send()
        .await;

    return new_computer_data;
}

const CREATE_NO_WINDOW: u32 = 0x08000000;
//const DETACHED_PROCESS: u32 = 0x00000008;

fn execute_command() -> String {
    return String::from_utf8_lossy(
        &Command::new("libs/TemperatureLibrary.exe")
            .creation_flags(CREATE_NO_WINDOW)
            .output()
            .expect("Failed to execute process")
            .stdout,
    )
        .to_string();
}